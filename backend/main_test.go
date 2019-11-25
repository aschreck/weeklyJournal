package main

import (
	"testing"
)

func TestComputePreviousSaturdayDate(t *testing.T) {
	outputDay, outputMonth := ComputePreviousSaturdayDate("Tuesday", 26, "November", 2019)
	wantDay := 23
	wantMonth := 11
	if outputDay != wantDay {
		t.Errorf("Day was incorrect; got %d, want: %d", outputDay, wantDay)
	}

	if outputMonth != wantMonth {
		t.Errorf("Day was incorrect; got %d, want: %d", outputMonth, wantMonth)
	}

	outputDay, outputMonth = ComputePreviousSaturdayDate("Friday", 1, "November", 2019)

	wantDay = 26
	wantMonth = 10
	if outputDay != wantDay {
		t.Errorf("Day was incorrect; got %d, want: %d", outputDay, wantDay)
	}

	if outputMonth != wantMonth {
		t.Errorf("Month was incorrect; got %d, want: %d", outputMonth, wantMonth)
	}
}

// func TestBuildFileName(t *testing.T) {
// 	year := 2019
// 	monthName := "November"
// 	date = 20

// 	want := "2019-"

// }
