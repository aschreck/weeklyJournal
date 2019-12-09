package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

// Entry is defined as a the JSON for the whole week.
type Entry struct {
	WeekDate string `json:"weekDate"`
	Weekly   struct {
		Review struct {
			Content string `json:"content"`
		} `json:"review"`
		Gratitude struct {
			Content string `json:"content"`
		} `json:"gratitude"`
		Goals struct {
			Content string `json:"content"`
		} `json:"goals"`
		Projects struct {
			Content string `json:"content"`
		} `json:"projects"`
		Health struct {
			Contents string `json:"contents"`
		} `json:"health"`
		Thoughts struct {
			Contents string `json:"contents"`
		} `json:"thoughts"`
		Daily struct {
			Monday struct {
				SetGoals struct {
					Content string `json:"content"`
				} `json:"setGoals"`
				ReviewGoals struct {
					Content string `json:"content"`
				} `json:"reviewGoals"`
			} `json:"monday"`
			Tuesday struct {
				SetGoals struct {
					Content string `json:"content"`
				} `json:"setGoals"`
				ReviewGoals struct {
					Content string `json:"content"`
				} `json:"reviewGoals"`
			} `json:"tuesday"`
			Wednesday struct {
				SetGoals struct {
					Content string `json:"content"`
				} `json:"setGoals"`
				ReviewGoals struct {
					Content string `json:"content"`
				} `json:"reviewGoals"`
			} `json:"wednesday"`
			Thursday struct {
				SetGoals struct {
					Content string `json:"content"`
				} `json:"setGoals"`
				ReviewGoals struct {
					Content string `json:"content"`
				} `json:"reviewGoals"`
			} `json:"thursday"`
			Friday struct {
				SetGoals struct {
					Content string `json:"content"`
				} `json:"setGoals"`
				ReviewGoals struct {
					Content string `json:"content"`
				} `json:"reviewGoals"`
			} `json:"friday"`
			Saturday struct {
				SetGoals struct {
					Content string `json:"content"`
				} `json:"setGoals"`
				ReviewGoals struct {
					Content string `json:"content"`
				} `json:"reviewGoals"`
			} `json:"saturday"`
			Sunday struct {
				SetGoals struct {
					Content string `json:"content"`
				} `json:"setGoals"`
				ReviewGoals struct {
					Content string `json:"content"`
				} `json:"reviewGoals"`
			} `json:"sunday"`
		} `json:"daily"`
	} `json:"weekly"`
}

var apiPath = "/api/v1"

func main() {
	http.HandleFunc(apiPath+"/getJournal", GetJournalIfExists)
	http.HandleFunc(apiPath+"/updateJournal", updateJournal)
	http.HandleFunc(apiPath+"/readEntry", readEntry)

	http.ListenAndServe(":8080", nil)
}

func GetJournalIfExists(w http.ResponseWriter, r *http.Request) {
	// check and see if there is a journal entry for the previous saturday.
	filePath, isPresent := doesEntryExist()

	if isPresent == false {
		http.Error(w, "Journal entry not found for this week", 404)
		return
	}

	// Otherwise open the file and return it as json.
	data, err := ioutil.ReadFile(filePath)

	if err != nil {
		http.Error(w, "Something went wrong", 500)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func readEntry(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != apiPath+"/readEntry" {
		http.Error(w, "404 not found", 404)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", 405)
	}

	// returns a map of all the query parameters.
	parameters := r.URL.Query()

	// not ok if the key I'm reading from does not exist.
	dateArr, ok := parameters["date"]
	date := dateArr[0]
	if !ok {
		http.Error(w, "Malformed — must provide journal date", 400)
	}

	// TODO: regex validate the date format.

	// try to read a file with this date.
	data, err := ioutil.ReadFile("entries/" + date + ".json")
	jsonString := string(data)
	if err != nil {
		http.Error(w, "File not found", 404)
	}

	fmt.Println(jsonString)
}

// this function will simply write the JSON file it receives from the frontend over whateve it currently has in its own stores.
func updateJournal(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != apiPath+"/updateJournal" {
		http.Error(w, "404 not found", 404)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", 405)
		return
	}

	// fmt.Println(r.URL.Query())
	var e Entry
	// assume that the incoming request has a JSON body
	err := json.NewDecoder(r.Body).Decode(&e)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// check for an existing file with this date. We're going to load the file into memory and edit it as such

	// start by writing the entries to a file.
	fmt.Printf("%v+", e)
	fmt.Fprintf(w, "Entry: %+v", e)
	jsonFile, err := json.MarshalIndent(e, "", "  ")

	if err != nil {
		fmt.Println("Problem parsing json: ", err)
	}
	err = ioutil.WriteFile("./entries/"+e.WeekDate+".json", jsonFile, 0644)

	if err != nil {
		panic(err)
	}
}

func startNewWeek(w http.ResponseWriter, r *http.Request) {

}

func doesEntryExist() (string, bool) {
	//  This function is simply going to check whether we have an entry for this week.
	date := time.Now()
	weekday := date.Weekday().String()
	day := date.Day()
	monthName := date.Month().String()
	year := date.Year()
	outputDay, outputMonth := ComputePreviousSaturdayDate(weekday, day, monthName, year)
	fmt.Println(outputDay, outputMonth)
	fileName := BuildFileName(year, outputMonth, outputDay)

	// check to see if this filename is present.
	fileNameWithPath := "entries/" + fileName
	fmt.Println(fileNameWithPath)
	_, err := os.Stat(fileNameWithPath)
	if os.IsNotExist(err) {
		return "", false
	}
	return fileNameWithPath, true
}

func BuildFileName(year int, monthNum int, dayNum int) string {
	return fmt.Sprintf("%d-%d-%d.json", year, monthNum, dayNum)
}

// TODO: Look for ways to refactor this

// ComputePreviousSaturdayDate returns the day and month number of the most recent previous saturday.
func ComputePreviousSaturdayDate(weekday string, day int, monthName string, year int) (int, int) {
	dayWeekDiffValues := map[string]int{
		"Saturday":  0,
		"Sunday":    1,
		"Monday":    2,
		"Tuesday":   3,
		"Wednesday": 4,
		"Thursday":  5,
		"Friday":    6,
	}

	daysInMonth := map[string]int{
		"January":   31,
		"February":  28,
		"March":     31,
		"April":     30,
		"May":       31,
		"June":      30,
		"July":      31,
		"August":    31,
		"September": 30,
		"October":   31,
		"November":  30,
		"December":  31,
	}

	numberToMonth := map[int]string{
		1:  "January",
		2:  "February",
		3:  "March",
		4:  "April",
		5:  "May",
		6:  "June",
		7:  "July",
		8:  "August",
		9:  "September",
		10: "October",
		11: "November",
		12: "December",
	}

	monthToNumber := map[string]int{
		"January":   1,
		"February":  2,
		"March":     3,
		"April":     4,
		"May":       5,
		"June":      6,
		"July":      7,
		"August":    8,
		"September": 9,
		"October":   10,
		"November":  11,
		"December":  12,
	}

	distanceFromSaturday := dayWeekDiffValues[weekday]
	diff := day - distanceFromSaturday

	var outputDay int
	var outputMonthNumber int
	if diff < 0 {
		// Calculate the date of the previous Saturday when that Saturday occured in the previous month.
		outputMonthNumber = monthToNumber[monthName] - 1
		outputMonth := numberToMonth[outputMonthNumber]
		outputMonthDays := daysInMonth[outputMonth]
		outputDay = outputMonthDays - (diff * -1)
	} else {
		outputDay = diff
		outputMonthNumber = monthToNumber[monthName]
	}
	return outputDay, outputMonthNumber
}
