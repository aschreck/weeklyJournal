import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="nav-right"><a href="/auth/google">Log in with google</a></li>
        )
      default:
        return (
          <div> 
            <li className="nav-right"><a href="/api/logout">Logout</a></li>
            <li className="nav-right"><a href="/settings">Settings</a></li>
          </div>
        )
    }
  }

  render() {
    return (
      <div className="topnav">
        <div className="nav-left">
          <h1>weeklyJournal</h1>
        </div>
        <ul>
          {this.renderContent()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header);
