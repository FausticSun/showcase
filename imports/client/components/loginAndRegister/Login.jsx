import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Header, Form } from 'semantic-ui-react';

const LoginStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }
  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  loginUser = () => {
    Meteor.loginWithPassword(this.state.userName, this.state.password);
    FlowRouter.go('/');
  };
  render() {
    const { password, userName } = this.state;
    return (
      <div style={LoginStyle}>
        <Header as="h2">
          Log in to your account
        </Header>
        <Form size="large" onSubmit={this.loginUser}>
          <Form.Input name="userName" value={userName} label="Username" placeholder="Username" onChange={this.onChangeHandler} />
          <Form.Input name="password" value={password} label="Password" type="password" placeholder="Password" onChange={this.onChangeHandler} />
          <Form.Button>Log In</Form.Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  currentUser: PropTypes.string,
};

Login.defaultProps = {
  currentUser: null,
};

export default createContainer(() => ({
  currentUser: Meteor.userId(),
}), Login);
