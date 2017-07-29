import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { Form } from 'semantic-ui-react';

const RegisterStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      userName: '',
      repeatPassword: '',
    };
  }
  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  registerUser = () => {
    Accounts.createUser({
      profile: {
        name: this.state.name,
        profilePic: 'https://qph.ec.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013-c',
      },
      username: this.state.userName,
      password: this.state.password,
    });
    FlowRouter.go('/');
  };
  render() {
    const { name, password, userName, repeatPassword } = this.state;

    return (
      <div style={RegisterStyle}>
        <Form size="large" onSubmit={this.registerUser}>
          <Form.Input name="name" value={name} label="Name" placeholder="Name" onChange={this.onChangeHandler} />
          <Form.Input name="userName" value={userName} label="Desired Username" placeholder="Username" onChange={this.onChangeHandler} />
          <Form.Input name="password" value={password} label="Password" type="password" placeholder="Password" onChange={this.onChangeHandler} />
          <Form.Input name="repeatPassword" value={repeatPassword} label="Repeat Password" type="password" placeholder="Repeat Password" onChange={this.onChangeHandler} />
          <Form.Button>Register</Form.Button>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  currentUser: PropTypes.string,
};

Register.defaultProps = {
  currentUser: null,
};

export default createContainer(() => ({
  currentUser: Meteor.userId(),
}), Register);
