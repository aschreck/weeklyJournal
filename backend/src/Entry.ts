const fs =  require('fs');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// this function assumes that it will be receiving a date adjusted for
const getEntryIfExtant = (filePath: string) => {

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  catch (error) {
    console.log(error)
    return null
  }
}

// const buildFileNameFromDate = () => {
//   const year = Date.getFullYear();
//   const month = Date.getMonth() + 1;
//   const day = Date.getDate();
//   return `${year}-${month}-${day}.json`
// }

// take in an input date and calculate the date of the saturday you should be looking for.
const computePreviousSaturday = (weekDay: number, monthDay: number, month: number, year: number) => {
  const dayWeekDiffValues: [string] = [
		"Saturday",
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
  ]
}

exports.getEntryIfExtant = getEntryIfExtant
exports.computePreviousSaturday = computePreviousSaturday
