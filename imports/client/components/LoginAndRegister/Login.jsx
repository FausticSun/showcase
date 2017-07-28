import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';

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
      name: '',
      userName: '',
      repeatPassword: '',
    };
  }
  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { password, userName } = this.state;

    return (
      <div style={LoginStyle}>
        <Form size="big" onSubmit={this.onSubmitHandler}>
          <Form.Input name="userName" value={userName} label='Username'  placeholder="Username" onChange={this.onChangeHandler} />
          <Form.Input name="password" value={password} label='Password' type='password' placeholder="Password" onChange={this.onChangeHandler} />
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
