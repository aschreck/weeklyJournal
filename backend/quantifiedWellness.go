package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

type wellnessCategories struct {
	categories []string
}

func getWellnessCategories(w http.ResponseWriter, r *http.Request) {
	// read the categories.json file.

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", 405)
	}

	data, err := ioutil.ReadFile("./wellnessCategories.json")

	if err != nil {
		panic(err)
	}
	stringData := string(data)

	fmt.Fprintln(w, stringData)

}
