import { dateObj, IJournalEntry } from "./interfaces";
import * as fs from 'fs';

const journalPath = "./entries/"

export const startNewJournalWeek = () => {
  // need to check if entry exists
  const date = getDate()
  let fileName = buildEntryFilename(computePreviousSaturday(date));
  fileName = `./entries/${fileName}`;
  const extant = doesFileExist(fileName);

  if (extant) {
    return false;
  } else {
    // create a new file with the appropriate name.
    const templateJSON = JSON.stringify(fs.readFileSync("./entryTemplate.json", "utf8"), null, 2);
    fs.writeFileSync(fileName, templateJSON);
    return true;
  }
}

const doesFileExist = (filePath: string) => {
  return fs.existsSync(filePath);
}

export const writeJournalEntry = (entry: IJournalEntry) => {
  const date = entry.weekDate;
  const data = JSON.stringify(entry, null, 2);
  //build the filename
  const filename = `./entries/${date}.json`;
  fs.writeFileSync(filename, data);
}

export const deliverEntryOrNull = () => {
  const currentDate: dateObj = getDate()
  const previousSaturdayDate = computePreviousSaturday(currentDate);
  return getEntryIfExtant(journalPath + buildEntryFilename(previousSaturdayDate));
}

const getDate = (): dateObj => {
  const d = new Date()
  const date: dateObj = {
    weekDay: d.getDay(),
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  }

  return date;
}
// this function assumes that it will be receiving a date adjusted for
export const getEntryIfExtant = (filePath: string): IJournalEntry | null => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  catch (error) {
    console.log(error)
    return null
  }
}

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
		12: 31,
  }

  const distanceFromSaturday = convertDayInteger(weekDay);

  //Thurs Jan 3rd
  const diff = monthDay - distanceFromSaturday;
  let outputDay: number;
  let outputMonth: number;
  if ( diff <= 0 ) {
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
    outputMonth = month
  }

  const output = {
    day: outputDay,
    month: outputMonth,
    year: year,
  }
  return output;
}

export const convertDayInteger = (javaScriptDay: number): number => {
  if (javaScriptDay === 6) {
    return 0
  } else {
    return javaScriptDay + 1;
  }
}

export const buildEntryFilename = (date: dateObj): string => {
  return `${date.year}-${date.month}-${date.day}.json`
}
