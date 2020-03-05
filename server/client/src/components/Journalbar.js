const React = require('react')

const days = ["Saturday", "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

class JournalBar extends React.Component {

  changeJournalBasedOnDate(e) {
    console.log("The Event is: ",e)
    const pickedTime = document.getElementById('journal-window')
    console.log('PickedTime is:', pickedTime);
    console.log('the chosen date is:', pickedTime.valueAsDate);
  }
  renderWeekdayButtons() {
    return days.map((day) => {
      return <button className='ui button' onClick={this.props.changeJournalDay}>{day}</button>
    })
  }
  render() {
    return (
        <div className='button-bar'>
          { this.renderWeekdayButtons()}
          <input type='date' id='journal-window' onChange={this.changeJournalBasedOnDate}></input>
        </div>

    )
  }
}

export default JournalBar