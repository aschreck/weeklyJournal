import { expect, assert } from 'chai';
import 'mocha';
import * as Entry from '../components/Entry'

// NOTE: because JS indexes their days from Saturday instead of Sunday, these weekday values for tests must be input from Sunday to simulate how the date object is delivered.
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

  it('should work when the saturday is in the previous year', () => {
    const date = {
      weekDay: 5,
      day: 3,
      month: 1,
      year: 2020,
    }

    const result = Entry.computePreviousSaturday(date);

    expect(result.day).to.equal(28);
    expect(result.month).to.equal(12);
    expect(result.year).to.equal(2019);
  })
})

describe('#convertDayInteger', () => {
  it('should shift days up one', () => {
    expect(Entry.convertDayInteger(1)).to.equal(2);
  })
  it('should reset to zero index when the input is a javascript saturday', () => {
    expect(Entry.convertDayInteger(6)).to.equal(0);
  })
})

describe('#buildEntryFilename', () => {
  it('should properly build filenames from date objects', () => {
    const date = {
      weekDay: 0,
      day: 4,
      month: 1,
      year: 2020,
    }
    expect(Entry.buildEntryFilename(date)).to.equal("2020-1-4.json");
  })
})
