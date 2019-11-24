package main

import (
	"testing"
)

func TestComputePreviousSaturdayDate(t *testing.T) {
	outputDay, outputMonth := ComputePreviousSaturdayDate("Tuesday", 26, "November", "2019")
	want := 23

	if outputDay != want {
		t.Errorf("Day was incorrect; got %d, want: %d", outputDay, want)
	}

	if outputMonth != "November" {
		t.Errorf("Day was incorrect; got %s, want: %s", outputMonth, "November")
	}
}
