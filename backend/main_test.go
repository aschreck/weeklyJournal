package main

import (
	"testing"
)

func TestComputePreviousSaturdayDate(t *testing.T) {
	outputDay1, outputMonth1 := ComputePreviousSaturdayDate("Tuesday", 26, "November", "2019")
	want := 23

	if outputDay1 != want {
		t.Errorf("Day was incorrect; got %d, want: %d", outputDay1, want)
	}

	if outputMonth1 != "November" {
		t.Errorf("Day was incorrect; got %s, want: %s", outputMonth1, "November")
	}

	outputDay2, outputMonth2 := ComputePreviousSaturdayDate("Friday", 1, "November", "2019")

	want = 26
	if outputDay2 != want {
		t.Errorf("Day was incorrect; got %d, want: %d", outputDay2, want)
	}

	if outputMonth2 != "October" {
		t.Errorf("Month was incorrect; got %s, want: %s", outputMonth2, "October")
	}

}
