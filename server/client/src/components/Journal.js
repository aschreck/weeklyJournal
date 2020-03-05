import React, { Component } from 'react';
import JournalBar from './Journalbar'
import JournalArea from './JournalArea'
import axios from 'axios'

// this component needs to either pull a journal entry for the week or say that you haven't started one yet.
class Journal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weeklyPrompts: "",
      dailyPrompts: "",
      // default for now
      displayDay: "Monday"
    }
    this.displayJournalForSpecificDay = this.displayJournalForSpecificDay.bind(this)
  }

  async componentDidMount() {
    const result = await axios.get('/api/currentUser')
    const userInfo = result.data[0]

    this.setState({ weeklyPrompts: userInfo.weeklyPrompts, dailyPrompts: userInfo.dailyPrompts})
  }

  displayJournalForSpecificDay(e) {
    console.log(e.target.innerText)
    const displayDay = e.target.innerText
    this.setState({ displayDay: displayDay })
    console.log('state is:',this.state);
  }

  render() {
    return (
      <div className='container'>
        <JournalBar changeJournalDay={this.displayJournalForSpecificDay}/>
        <JournalArea displayDay={this.state.displayDay}/>
      </div>
    )
  }
}

export default Journal
