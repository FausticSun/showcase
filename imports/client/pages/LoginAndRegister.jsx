import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Login from '../components/LoginAndRegister/Login.jsx';
import Register from '../components/LoginAndRegister/Register.jsx';

const LoginAndRegisterStyle = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
};

class LoginAndRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={LoginAndRegisterStyle}>
        <Login />
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
