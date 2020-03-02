import React from 'react'
import axios from 'axios'

class SettingsDaily extends React.Component {
  constructor(props) {
    super(props)

    this.state = {morningPrompts: "", eveningPrompts: ""}
  }

  async componentDidMount() {
    let dailyPrompts = await axios.get("/api/dailyPrompts")
    dailyPrompts = dailyPrompts.data.message
    console.log("did mount daily prompts are:", dailyPrompts.morning)
    this.setState(
      {
        morningPrompts: dailyPrompts.morning,
        eveningPrompts: dailyPrompts.evening
      }
    )
  }

  async handleSubmit(e) {
    e.preventDefault()
    const prompts = document.getElementsByClassName("daily-prompts")
    const payload = {
      morning: prompts[0].value.split(','),
      evening: prompts[1].value.split(',')
    }
    console.log('payload is:', payload);

    try {
      const result = await axios.post("/api/dailyPrompts", payload)
      console.log('result is: ', result);
    } catch(err) {
      console.log('error is', err);
    }
  }

  render() {
    return (
      <div className='ui container'>
        <form onSubmit={this.handleSubmit}>
          <textarea className="daily-prompts" type='text' defaultValue={this.state.morningPrompts} name='entry-window' rows="18" columns="400"></textarea>
          <textarea className="daily-prompts" type='text' defaultValue={this.state.eveningPrompts} name='entry-window' rows="18" columns="400"></textarea>
          <input type='submit' name='entry-submit-btn'></input>
        </form>
      </div>
    )
  }
}

export default SettingsDaily