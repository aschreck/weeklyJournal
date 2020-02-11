import React from 'react';

class EntryCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: props.text }
  }

  updateState = (e) => {
    this.setState({text: e.target.value})
  }

  // This function should be in charge of updating the journal record on the backend.
  handleSubmit = (e) => {
    e.preventDefault()

    console.log("No op submit event")
  }

  render() {
    console.log(this.state);

    return (
      <div className='ui segment'>
        <form onSubmit={this.handleSubmit}>
          <textarea type='text' onChange={this.updateState} defaultValue={this.state.text} name='entry-window'></textarea>
          <input type='submit' name='entry-submit-btn'></input>
        </form>
      </div>
    )
  }
}

export default EntryCard;