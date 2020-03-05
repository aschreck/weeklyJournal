import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

import Journal from './Journal'
import Header from './Header';
import Home from './Home';
import Settings from './Settings';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    console.log(this.props.auth)
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={ WelcomeScreen } />
            <Route exact path="/home" component={ Home } />
            <Route exact path="/journal" component={ Journal } />
            <Route exact path="/settings" component={ Settings } />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App);

