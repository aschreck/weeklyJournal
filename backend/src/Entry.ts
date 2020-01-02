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
export const computePreviousSaturday = (weekDay: number, monthDay: number, month: number, year: number): [number, number] => {
  // the purpose of this function is to compute the date of the previous saturday.
  // So to calculate this, I need the current date
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
  return [outputDay, outputMonth]
}

export const convertDayInteger = (javaScriptDay: number): number => {
  if (javaScriptDay === 6) {
    return 0
  } else {
    return javaScriptDay + 1;
  }
}

// exports.getEntryIfExtant = getEntryIfExtant
// exports.computePreviousSaturday = computePreviousSaturday
// exports.convertDayInteger = convertDayInteger
