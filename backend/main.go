package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

var apiPath = "/api/v1"

func main() {
	http.HandleFunc(apiPath+"/getJournal", GetJournalIfExists)
	http.HandleFunc(apiPath+"/updateJournal", updateJournal)
	http.HandleFunc(apiPath+"/readEntry", readEntry)
	http.HandleFunc(apiPath+"/startNewWeek", startNewWeek)
	http.HandleFunc(apiPath+"/wellnessCategories", getWellnessCategories)

	http.ListenAndServe(":8080", nil)
}

// TODO: Look for ways to refactor this

// ComputePreviousSaturdayDate returns the day and month number of the most recent previous saturday.

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
	// make sure that a week does not already exist
	_, isPresent := doesEntryExist()

	if isPresent == true {
		http.Error(w, "Entry already exists", 400)
	}
	// compute the name of the file.
	fileToBeCreated := computeJournalEntryFileName()
	// copy the template into the the entries file.
	copy("./entryTemplate.json", fileToBeCreated)
	w.WriteHeader(204)
}
