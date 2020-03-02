import React from 'react'
import axios from 'axios'

class SettingsWeekly extends React.Component {
  constructor(props) {
    super(props)

    this.state = {prompts: ""}
  }
  async componentDidMount() {
    let weeklyPrompts = await axios.get("/api/weeklyPrompts")
    weeklyPrompts = weeklyPrompts.data.message.prompts
    this.setState({prompts: weeklyPrompts})
  }

  formatDefaultText() {
    return this.state.prompts
  }

  async handleSubmit(e) {
    e.preventDefault()
    const prompts = document.getElementById("weekly-prompts-text").value

    const promptsJSON = {
      prompts: prompts.split(',')
    }
    try {
      const result = await axios.post("/api/weeklyPrompts", promptsJSON)
      console.log('result is:', result);
    } catch (err) {
      alert(err)
    }
  }

  render() {
    return (
      <div className='ui container'>
        <form onSubmit={this.handleSubmit}>
          <textarea id='weekly-prompts-text' name="weekly-prompts-text" rows="18" columns="400" type='text' defaultValue={this.formatDefaultText()} ></textarea>
          <input type='submit' name='entry-submit-btn' />
        </form>
      </div>
    )
  }
}

export default SettingsWeekly