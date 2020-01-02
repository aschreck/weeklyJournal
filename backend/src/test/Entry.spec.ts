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
    const weekDay = 3;
    const monthDay = 25;
    const month = 12
    const year  = 2019

    const result = Entry.computePreviousSaturday(weekDay, monthDay, month, year);

    expect(result[0]).to.equal(21);
    expect(result[1]).to.equal(12);
  })

  it('should work when the saturday is the last day in the previous month', () => {
    const weekDay = 2;
    const monthDay = 3;
    const month = 12
    const year  = 2019

    const result = Entry.computePreviousSaturday(weekDay, monthDay, month, year);

    expect(result[0]).to.equal(30);
    expect(result[1]).to.equal(11);
  })

  it('should work with a saturday in the previous month', () => {
    const weekDay = 5;
    const monthDay = 4;
    const month = 10;
    const year  = 2019;

    const result = Entry.computePreviousSaturday(weekDay, monthDay, month, year);

    expect(result[0]).to.equal(28);
    expect(result[1]).to.equal(9);
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