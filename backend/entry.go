package main

import (
	"fmt"
	"io"
	"os"
	"time"
)

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

func BuildFileName(year int, monthNum int, dayNum int) string {
	return fmt.Sprintf("%d-%d-%d.json", year, monthNum, dayNum)
}
func copy(srcFileName, destinationFileName string) (int64, error) {
	sourceFileStat, err := os.Stat(srcFileName)

	if err != nil {
		return 0, err
	}

	if !sourceFileStat.Mode().IsRegular() {
		return 0, fmt.Errorf("%s is not a regular file", srcFileName)
	}

	source, err := os.Open(srcFileName)
	if err != nil {
		return 0, err
	}
	defer source.Close()

	destinationFile, err := os.Create(destinationFileName)
	if err != nil {
		return 0, err
	}
	defer destinationFile.Close()
	nBytes, err := io.Copy(destinationFile, source)
	return nBytes, err
}

func computeJournalEntryFileName() string {
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
	return fileNameWithPath
}

func doesEntryExist() (string, bool) {
	fileNameWithPath := computeJournalEntryFileName()
	fmt.Println(fileNameWithPath)
	_, err := os.Stat(fileNameWithPath)
	if os.IsNotExist(err) {
		return "", false
	}
	return fileNameWithPath, true
}

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
