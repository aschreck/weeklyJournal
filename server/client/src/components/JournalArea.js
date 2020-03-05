import React from 'react'

class JournalArea extends React.Component {
  constructor(props) {
    super(props)
  }
  // this component needs to receive a list of prompts and render a list of responses.
  render() {
    return (
      <div className='container'>
        {/* want this to be a list of text areas, each of which having a card */}
        {this.props.displayDay}
      </div>
    )
  }
}

export default JournalArea