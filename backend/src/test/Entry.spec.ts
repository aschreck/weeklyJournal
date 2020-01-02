import { expect, assert } from 'chai';
import 'mocha';
import * as Entry from '../Entry'

describe('#getEntryIfExtant', () => {
  it("should return journal data for a given date if it exists", () => {
    const testEntryFilename = "./src/test/2019-12-26.json"
    let result = Entry.getEntryIfExtant(testEntryFilename)
    assert.hasAllKeys(result, ['weekDate', 'weekly', 'daily'])
  })

  it("should return null when no entry is present", () => {
    const testEntryFilename = "./test/2018-12-26.json"
    let result = Entry.getEntryIfExtant(testEntryFilename)
    expect(result).to.equal(null);
  })
})

describe('#computePreviousSaturday', () => {
  it('should work with a saturday in the same month', () => {
    const date = {
      weekDay: 3,
      day: 25,
      month: 12,
      year: 2019,
    }

    const result = Entry.computePreviousSaturday(date);

    expect(result.day).to.equal(21);
    expect(result.month).to.equal(12);
  })

  it('should work when the saturday is the last day in the previous month', () => {
    const date = {
      weekDay: 2,
      day: 3,
      month: 12,
      year: 2019,
    }

    const result = Entry.computePreviousSaturday(date);

    expect(result.day).to.equal(30);
    expect(result.month).to.equal(11);
  })

  it('should work with a saturday in the previous month', () => {
    const date = {
      weekDay: 5,
      day: 4,
      month: 10,
      year: 2019,
    }

    const result = Entry.computePreviousSaturday(date);

    expect(result.day).to.equal(28);
    expect(result.month).to.equal(9);
  })
})

describe('#convertDayInteger', () => {
  it('should shift days up one', () => {
    //I put in a Monday, which for JS is 1, but I want to be 2.
    expect(Entry.convertDayInteger(1)).to.equal(2);
  })
  it('should reset to zero index when the input is a javascript saturday', () => {
    expect(Entry.convertDayInteger(6)).to.equal(0);
  })
})