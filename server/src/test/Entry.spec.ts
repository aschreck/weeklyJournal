import { expect, assert } from 'chai';
import 'mocha';
import * as Entry from '../components/Entry'
import { IJournalPrompts, IDailyPrompts } from '../interfaces';

const entryTemplate = require("../entryTemplate")

// NOTE: because JS indexes their days from Saturday instead of Sunday, these weekday values for tests must be input from Sunday to simulate how the date object is delivered.
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

describe('#buildEntryTemplate', () => {
  it('should build a template with a user\'s chosen prompts', () => {
    const dailyPrompts: IDailyPrompts = {
      "morning": ["What am I grateful for today?", "What accomplishment would make today great?"],
      "evening": ["What went well today?", "What could have gone better?"]
    }

    const weeklyPrompts: IJournalPrompts = {
      "content": ["Review from last week", "Goal Setting", "Celebrations"]
    }

    const result = Entry.buildEntryTemplate(entryTemplate, "2020-2-8", weeklyPrompts, dailyPrompts)
    expect(result.weekDate).to.equal("2020-2-8")
    expect(result.weekly.includes("Review from last week")).to.be.true
    expect(result.weekly.includes("Goal Setting")).to.be.true
    expect(result.weekly.includes("Celebrations")).to.be.true
    expect(result.daily.monday.morning.includes("What am I grateful for today?")).to.be.true
    expect(result.daily.tuesday.morning.includes("What accomplishment would make today great?")).to.be.true
    expect(result.daily.saturday.evening.includes("What could have gone better?")).to.be.true
    expect(result.daily.sunday.evening.includes("What could have gone better?")).to.be.true
  })
})