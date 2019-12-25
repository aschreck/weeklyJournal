import React from 'react';

// I want to click the button and call this function which will issue a request to the API and re-render the appropriate component.
class WelcomeScreen extends React.Component {
  state = {
    initializeFunction: this.props.function
  }

  render() {
    return (
      <div className='ui segment'>
        <h1>Welcome to weeklyJournal!</h1>
        <button onClick={this.state.initializeFunction} className='ui button'>Start Journaling</button>
      </div>
    )
  }
}

export default WelcomeScreen;