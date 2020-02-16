import React from 'react';
import axios from 'axios';
import WelcomeScreen from './WelcomeScreen';
import { BrowserRouter, Route } from 'react-router-dom'

import EntryCard from './EntryCard';
import Header from './Header';
import Home from './Home';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={ WelcomeScreen } />
            <Route exact path="/home" component={ Home } />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

