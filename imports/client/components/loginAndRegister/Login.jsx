import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Grid, Label, Header, Form } from 'semantic-ui-react';
import { leftWidth, centerWidth } from './Register.jsx';
const LoginStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '65%',
  margin: 'auto',
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
        <Form onSubmit={this.loginUser}>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column style={{ margin: 'auto' }}>
                <Header as="h4">Username</Header>
              </Grid.Column>
              <Grid.Column width={centerWidth}>
                <Form.Input name="userName" value={userName} placeholder="Username" onChange={this.onChangeHandler}  />
              </Grid.Column>
              <Grid.Column style={{ margin: 'auto' }}>
                { this.state.usernameError ?
                  <Label basic color="red" pointing="left">Enter username!</Label>
                  : ''
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={leftWidth} style={{ margin: 'auto' }}>
                <Header as="h4">Password</Header>
              </Grid.Column>
              <Grid.Column width={centerWidth}>
                <Form.Input name="password" value={password} type="password" placeholder="Password" onChange={this.onChangeHandler} />
              </Grid.Column>
              <Grid.Column style={{ margin: 'auto' }}>
                { this.state.passwordError ?
                  <Label basic color="red" pointing="left">Password must be at least six characters long!</Label>
                  : ''
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={leftWidth} style={{ margin: 'auto' }} />
              <Grid.Column width={centerWidth} style={{ margin: 'auto' }}>
                <Form.Button>Log In</Form.Button>
              </Grid.Column>
              <Grid.Column style={{ margin: 'auto' }} />
            </Grid.Row>
          </Grid>
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
