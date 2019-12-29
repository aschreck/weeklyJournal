const chai = require('chai');
const assert = chai.assert;
const Entry = require("../Entry");

describe('#Entry', () => {
  it("should return journal data for a given date if it exists", () => {
    const testEntryFilename = "./test/2019-12-26.json"
    let result = Entry.getEntryIfExtant(testEntryFilename)
    assert.hasAllKeys(result, ['weekDate', 'weekly', 'daily'])
  })

  it("should return null when no entry is present", () => {
    const testEntryFilename = "./test/2018-12-26.json"
    let result = Entry.getEntryIfExtant(testEntryFilename)
    assert.equal(result, null);
  })
})