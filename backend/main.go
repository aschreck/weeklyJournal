package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// dummy comment
type Entry struct {
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
	fmt.Fprintf(w, "Entry: %+v", e)
}
