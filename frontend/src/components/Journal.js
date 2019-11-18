import React, { Component } from 'react';
import Entry from "./Entry"
// this is going to be the parent component for all of the journal sections.

let mode = ""

class Journal extends Component {
  constructor(props) {
    super(props)

    this.categories = [
      "review",
      "gratitudes",
      "goals"
    ]
  }

  buildJournalJSX() {
    let journalEntries = ''
    this.categories.forEach((category) => {
      journalEntries += <Entry category={category} />
    })
    return journalEntries;
  }

  render() {
    return (
      <div id='journal-menu'>
        <div>
          {this.categories.map((category) => {
            return <Entry key={category} category={category}/>
          })}
        </div>
        <div id='journal-text-box'></div>
      </div>
    )
  }
}

export default Journal