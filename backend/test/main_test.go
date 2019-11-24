package main_test

import (
	"testing"

	"../main"
)

func TestComputePreviousSaturdayDate(t *testing.T) {
	outputDay, outputMonth := main.ComputePreviousSaturdayDate("Tuesday", 26, "November", 2019)

	if outputDay != 24 {
		t.Errorf("Day was incorrect; got %d, want: %d", outputMonth, 23)
	}

	if outputMonth != "November" {
		t.Errorf("Day was incorrect; got %s, want: %s", outputMonth, "November")
	}
}
