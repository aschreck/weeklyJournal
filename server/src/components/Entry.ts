import {
  dateObj,
  IJournalEntry,
  IJournalPrompts,
  IDailyPrompts
} from "../interfaces";
import * as fs from "fs";
const pg = require("knex")(require("../../knexfile.js")["development"]);
const entryTemplate = require("../entryTemplate");

export const getJournalEntry = async (id: string) => {
  try {
    const result = await pg("entries").where({ user_id: id });
    return result[0];
  } catch (err) {
    console.log(err);
  }
};

export const updateJournalEntry = async (id: string, entry: IJournalEntry) => {
  try {
    const result = await pg("entries")
      .where({ user_id: id })
      .update({ content: JSON.stringify(entry) });
    console.log("result for update is: ", result);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchCurrentJournal = async (id: string) => {
  const rightNow = getDate();
  const targetDate = computePreviousSaturday(rightNow);
  console.log("the date is:", targetDate)

  // lookup the journal for current date.
  const result = await pg("entries").where({
    user_id: id,
    date: targetDate
  });

  return result;
  // based on whether the result has a value or not,
};

export const startNewJournalWeek = async (id: string) => {
  const currentDate: dateObj = getDate();
  const previousSaturdayDate = computePreviousSaturday(currentDate);
  const date: string = buildEntryDate(previousSaturdayDate);

  const userPrompts = await getAllUserPrompts(id);
  console.log("userpropmts are:", userPrompts)

  const journalTemplate = buildEntryTemplate(
    entryTemplate,
    date,
    userPrompts.weeklyPrompts,
    userPrompts.dailyPrompts
  );
  try {
    const result = await pg("entries")
      .insert({
        date: date,
        user_id: id,
        content: JSON.stringify(journalTemplate)
      })
      .returning("*");
    return true;
  } catch (err) {
    console.log("Error creating Entry:", err);
    return false;
  }
};

export const getAllUserPrompts = async (userID: string) => {
  let user = await pg("users").where({ id: userID });
  user = user[0]
  const weeklyPrompts = user.weeklyPrompts;
  const dailyPrompts = user.dailyPrompts;
  return { weeklyPrompts, dailyPrompts };
};

export const getWeeklyPrompts = (id: string) => {
  return new Promise((resolve, reject) => {
    pg("users")
      .where({ id: id })
      .then((result: any) => {
        const prompts = result[0].weeklyPrompts;
        return resolve(prompts);
      })
      .catch((err: Error) => {
        console.log("Error fetching record:", err);
        return reject(err);
      });
  });
};

export const buildEntryTemplate = (
  journalTemplate: IJournalEntry,
  date: string,
  weeklyPrompts: IJournalPrompts,
  dailyPrompts: IDailyPrompts
): IJournalEntry => {
  console.log("Journaltemplate:", journalTemplate);
  console.log("WeeklyPrompts:", weeklyPrompts);
  console.log("dailyPrompts:", dailyPrompts);
  journalTemplate.weekDate = date;
  journalTemplate.weekly = weeklyPrompts.content;

  for (let [key, value] of Object.entries(journalTemplate.daily)) {
    journalTemplate.daily[key].morning = dailyPrompts.morning;
    journalTemplate.daily[key].evening = dailyPrompts.evening;
  }
  return journalTemplate;
};

export const setWeeklyPrompts = async (
  prompts: IJournalPrompts,
  id: string
) => {
  try {
    const result = await pg("users")
      .where({ id: id })
      .update({ weeklyPrompts: JSON.stringify(prompts) });
    return result ? true : false;
  } catch (err) {
    console.log("Error updating record:", err);
    return false;
  }
};

export const getDailyPrompts = (id: string) => {
  return new Promise((resolve, reject) => {
    pg("users")
      .where({ id: id })
      .then((result: any) => {
        const prompts = result[0].dailyPrompts;
        return resolve(prompts);
      })
      .catch((err: Error) => {
        console.log("Error updating record:", err);
        return false;
      });
  });
};

export const setDailyPrompts = async (prompts: IJournalPrompts, id: string) => {
  try {
    const result = await pg("users")
      .where({ id: id })
      .update({ dailyPrompts: JSON.stringify(prompts) });
    return result ? true : false;
  } catch (err) {
    console.log("Error updating record:", err);
    return false;
  }
};

export const getDate = (): dateObj => {
  const d = new Date();
  const date: dateObj = {
    weekDay: d.getDay(),
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear()
  };

  return date;
};
// this function assumes that it will be receiving a date adjusted for
export const getEntryIfExtant = (filePath: string): IJournalEntry | null => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.log(error);
    return null;
  }
};

// take in an input date and calculate the date of the saturday you should be looking for.
export const computePreviousSaturday = (date: dateObj): dateObj => {
  // the purpose of this function is to compute the date of the previous saturday.
  const weekDay = date.weekDay;
  const monthDay = date.day;
  const month = date.month;
  let year = date.year;

  const daysInMonth: any = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  const distanceFromSaturday = convertDayInteger(weekDay);

  //Thurs Jan 3rd
  const diff = monthDay - distanceFromSaturday;
  let outputDay: number;
  let outputMonth: number;
  if (diff <= 0) {
    // special case for dealing with a leap that crosses years.
    if (month === 1) {
      outputMonth = 12;
      const daysInOutputMonth = daysInMonth[outputMonth];
      outputDay = daysInOutputMonth + diff;
      year = year - 1;
    } else {
      outputMonth = month - 1;
      const daysInOutputMonth = daysInMonth[outputMonth];
      // Diff will always be negative
      outputDay = daysInOutputMonth + diff;
    }
  } else {
    outputDay = diff;
    outputMonth = month;
  }

  const output = {
    day: outputDay,
    month: outputMonth,
    year: year
  };
  return output;
};

export const convertDayInteger = (javaScriptDay: number): number => {
  if (javaScriptDay === 6) {
    return 0;
  } else {
    return javaScriptDay + 1;
  }
};

export const buildEntryDate = (date: dateObj): string => {
  return `${date.year}-${date.month}-${date.day}`;
};
