import React from 'react';
import axios from 'axios';
import WelcomeScreen from './WelcomeScreen';
import EntryCard from './EntryCard';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayScreen: "welcome",
      backendUrl: "http://localhost:8080/api/v1"
    }
  }

  // I want to create a function that submits
  initializeJournalApp = () => {
    // this function needs to hit the backend and see if a journal entry exists.
    // then, it needs to update the displayScreen element and cause the app to re-render.
    // This will need to set state for the text as well.
    this.setState({displayScreen: "daily"})
  }

  renderWelcomeScreen = () => {
    return (
      <div>
        <WelcomeScreen function={this.initializeJournalApp}/>
      </div>
    )
  }

  renderDailyJournal = (text) => {
    return <EntryCard text={text} />
  }

  getJournalIfExists = async () => {
    const url = this.state.backendUrl + "/getJournal"
    axios.get(url)
    .then((resp) => {
      if (resp.status === 204) {
        // need to create a new journal entry
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  async componentDidMount() {
    // this function needs to query the backend and learn whether an entry has already been started or not.
    this.getJournalIfExists()
    console.log("Component has mounted");
  }

  render() {
    if (this.state.displayScreen === 'welcome') {
      return this.renderWelcomeScreen()
    } else if (this.state.displayScreen === 'daily') {
      return this.renderDailyJournal("This is a test journal entry")
    }
  }
}

export default App;
