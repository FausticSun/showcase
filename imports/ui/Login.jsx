import { Meteor } from 'meteor/meteor';

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Canvases } from '../api/canvases.js';

import Canvas from './Canvas.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import EmailPasswordForm from './EmailPasswordForm.jsx';
// App component - represents the whole app

class Login extends Component {
  constructor() {
    super();
    let registerMsg = "Don't have an account?";
    this.state = {
      input: '',
      pw: ''
    };
    this.loginWithPassword = this.loginWithPassword.bind(this);

  }
  loginWithPassword(email,pw) {
    // const email = this.state.input;
    // const password = this.state.pw;
    console.log("EMAIL:" + email);
    console.log("password:" + pw);

    Meteor.loginWithPassword(email, pw, function(error) {
      if (error) {
        console.log("There was an error:" + error.reason);
      } else {
        FlowRouter.go('/');
      }
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Login</h1>
            <EmailPasswordForm
              onSubmit={this.loginWithPassword}
              ref="epf"
            />
        </div>
      </div>
        )
    }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Login);
