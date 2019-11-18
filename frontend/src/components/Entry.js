import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Entry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      isVisible: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const char = event.target.value
    this.setState({data: this.state.data += char}, () => {
      console.log(this.state)
    })
    console.log(this.state)
  }

  renderTextBox = () => {
    console.log("render text box")
    console.log(this)
   let jsx = <input
    type="text"
    name="journal-field"
    value={this.state.data}
    onChange={this.handleChange}
   ></input>
    ReactDOM.render(
      jsx, document.getElementById('journal-text-box')
    )
  }

  render() {
    return (
      <button onClick={this.renderTextBox}>{this.props.category} </button>
    )
  }
}

export default Entry