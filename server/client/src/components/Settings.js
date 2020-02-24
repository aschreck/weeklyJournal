import React from 'react'
import axios from 'axios'
import EntryCard from "./EntryCard"

// this component needs to create the option to
class Settings extends React.Component {
  async componentDidMount() {
    const weeklyPrompts = await axios.get("/api/weeklyPrompts")

    console.log("WeeklyPrompts are", weeklyPrompts)
  }

  render() {
    return (
      <div>
        <EntryCard />
        <EntryCard />
      </div>
    )
  }
}

export default Settings

