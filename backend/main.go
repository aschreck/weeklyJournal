package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

// Entry asdfas
type Entry struct {
	Date     string `json:"date"`
	Category string `json:"category"`
	Content  string `json:"content"`
}

var apiPath = "/api/v1"

func main() {
	apiPath := "/api/v1"

	http.HandleFunc(apiPath+"/journalEntry", journalPost)
	http.ListenAndServe(":8080", nil)
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

	var e Entry
	// assume that the incoming request has a JSON body
	err := json.NewDecoder(r.Body).Decode(&e)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

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
