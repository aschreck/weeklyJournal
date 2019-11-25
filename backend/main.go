package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
)

// Entry asdfas
type EntryElement struct {
	Date     string `json:"date"`
	Category string `json:"category"`
	Content  string `json:"content"`
}

type Entry struct {
	Categories struct {
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
		Thoughts struct {
			Contents string `json:"contents"`
		} `json:"thoughts"`
	} `json:"categories"`
}

var apiPath = "/api/v1"

func main() {
	http.HandleFunc(apiPath+"/doesEntryExist", doesEntryExist)
	http.HandleFunc(apiPath+"/journalEntry", journalPost)
	http.HandleFunc(apiPath+"/readEntry", readEntry)

	http.ListenAndServe(":8080", nil)
}

func readEntry(w http.ResponseWriter, r *http.Request) {
	// this function needs to do one of two things:
	// 1) if a query parameter is provided, it needs to send back only the section of JSON associated with that category
	// 2) If there is no query parameter specified, return the whole file.

	// Brainstorm: one solution here might be to automatically create each new entry with all of the relevant fields and just set them to empty strings. that would homogenize my JSON format and make sure I don't need to deal with the problem of things not existing.
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

func journalPost(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != apiPath+"/journalEntry" {
		http.Error(w, "404 not found", 404)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", 405)
		return
	}

	// fmt.Println(r.URL.Query())
	var e EntryElement
	// assume that the incoming request has a JSON body
	err := json.NewDecoder(r.Body).Decode(&e)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// check for an existing file with this date. We're going to load the file into memory and edit it as such

	// start by writing the entries to a file.
	fmt.Fprintf(w, "Entry: %+v", e)
	jsonFile, err := json.MarshalIndent(e, "", "")

	if err != nil {
		fmt.Println("Problem parsing json: ", err)
	}

	err = ioutil.WriteFile("file.json", jsonFile, 0644)

	if err != nil {
		panic(err)
	}
}

func startNewWeek(w http.ResponseWriter, r *http.Request) {

}

func doesEntryExist(w http.ResponseWriter, r *http.Request) {
	//  This function is simply going to check whether we have an entry for this week.
	date := time.Now()
	weekday := date.Weekday().String()
	day := date.Day()
	monthName := date.Month().String()
	year := strconv.Itoa(date.Year())
	outputDay, outputMonth := ComputePreviousSaturdayDate(weekday, day, monthName, year)

	fmt.Println(outputDay, outputMonth)
}

func ComputePreviousSaturdayDate(weekday string, day int, monthName string, year string) (int, string) {
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

	fmt.Println("input parameters are", weekday, monthName, year)
	distanceFromSaturday := dayWeekDiffValues[weekday]
	diff := day - distanceFromSaturday

	var outputDay int
	var outputMonth string
	if diff < 0 {
		newMonthNumber := monthToNumber[monthName] - 1
		outputMonth = numberToMonth[newMonthNumber]
		outputMonthDays := daysInMonth[outputMonth]
		outputDay = outputMonthDays - (diff * -1)
		fmt.Println("output  months is: ", outputMonth)

	} else {
		outputDay = diff
		outputMonth = monthName
		fmt.Println("output  months is: ", outputMonth)

	}

	return outputDay, outputMonth
}
