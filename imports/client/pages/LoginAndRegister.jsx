import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Divider } from 'semantic-ui-react';
import Login from '../components/loginAndRegister/Login.jsx';
import Register from '../components/loginAndRegister/Register.jsx';

class LoginAndRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Login />
        <Divider horizontal>Or</Divider>
        <Register />
      </div>
    );
  }
}

LoginAndRegister.propTypes = {
  currentUser: PropTypes.string,
};

LoginAndRegister.defaultProps = {
  currentUser: null,
};

export default createContainer(() => ({
  currentUser: Meteor.userId(),
}), LoginAndRegister);
