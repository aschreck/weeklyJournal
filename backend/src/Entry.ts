import { dateObj } from "./interfaces";

const fs =  require('fs');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// this function assumes that it will be receiving a date adjusted for
export const getEntryIfExtant = (filePath: string) => {
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
  const year = date.year;

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

  const diff = monthDay - distanceFromSaturday;
  let outputDay: number;
  let outputMonth: number;

  if ( diff <= 0 ) {
    outputMonth = month - 1;
    const daysInOutputMonth = daysInMonth[outputMonth];
    // Diff will always be negative
    outputDay = daysInOutputMonth + diff;
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


// exports.getEntryIfExtant = getEntryIfExtant
// exports.computePreviousSaturday = computePreviousSaturday
// exports.convertDayInteger = convertDayInteger
