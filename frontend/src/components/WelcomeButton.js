import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Journal from './Journal'

class WelcomeButton extends Component {
  constructor (props) {
    super(props);
  }

  initNewWeek(e) {
    ReactDOM.render(<Journal />, document.getElementById("root"));
  }

  render(){
    return(
      <button id='welcome-btn' onClick={this.initNewWeek}>Start a new week</button>
    );
  }
}

export default WelcomeButton