import React from 'react'
import SettingsWeekly from './SettingsWeekly'
import SettingsDaily from './SettingsDaily'

class Settings extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   weeklyPrompts: "",
    //   dailyPrompts: ""
    // }
  }
  async componentDidMount() {
    // let weeklyPrompts = await axios.get("/api/weeklyPrompts")
    // weeklyPrompts = weeklyPrompts.data.message.prompts
    // let dailyPrompts = await axios.get("/api/dailyPrompts")
    // dailyPrompts = dailyPrompts.data.message
    // console.log("daily is:", dailyPrompts)
    // this.setState({weeklyPrompts: weeklyPrompts, dailyPrompts: dailyPrompts})
  }
  render() {
    return (
      <div className="ui text container">
        <h2 className="ui header"> Adjust your Settings</h2>
        <p>
          Adjust the settings associated with your journal here. You can update your daily prompts and your weekly prompts.
        </p>
        <div className="ui container">
          <SettingsWeekly />
          <SettingsDaily />
        </div>
      </div>
    )
  }
}

export default Settings

