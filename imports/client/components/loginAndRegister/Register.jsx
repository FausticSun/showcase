import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { Grid, Label, Header, Form } from 'semantic-ui-react';

const RegisterStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '65%',
  margin: 'auto',
};
export const leftWidth = 4;
export const centerWidth = 8;
const rightWidth = 2;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      userName: '',
      repeatPassword: '',
      usernameError: false,
      passwordError: false,
      repeatError: false,
    };
  }
  onChangeHandler = (e, { name, value }) => {
    this.setState({
      [name]: value,
      usernameError: false,
      passwordError: false,
      repeatError: false,
    });
  };
  trySubmit = () => {
    if (this.state.userName.length < 6) {
      this.setState({ usernameError: true });
    } else if (this.state.password.length < 6) {
      this.setState({ passwordError: true });
    } else if (this.state.repeatPassword !== this.state.password) {
      this.setState({ repeatError: true });
    } else {
      this.registerUser();
    }
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
        <Header as="h2">
          Register for an account
        </Header>
        <Form onSubmit={this.trySubmit}>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column style={{ margin: 'auto' }}>
                <Header as="h4">Name</Header>
              </Grid.Column>
              <Grid.Column width={centerWidth}>
                <Form.Input name="name" value={name} placeholder="Name" onChange={this.onChangeHandler} />
              </Grid.Column>
              <Grid.Column />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ margin: 'auto' }}>
                <Header as="h4">Desired Username</Header>
              </Grid.Column>
              <Grid.Column width={centerWidth}>
                <Form.Input name="userName" value={userName} placeholder="Username" onChange={this.onChangeHandler} />
              </Grid.Column>
              <Grid.Column style={{ margin: 'auto' }}>
                { this.state.usernameError ?
                  <Label basic color="red" pointing="left">Username must be at least six characters long!</Label>
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
              <Grid.Column width={leftWidth} style={{ margin: 'auto' }}>
                <Header as="h4">Repeat password</Header>
              </Grid.Column>
              <Grid.Column width={centerWidth}>
                <Form.Input name="repeatPassword" value={repeatPassword} type="password" placeholder="Repeat Password" onChange={this.onChangeHandler} />
              </Grid.Column>
              <Grid.Column style={{ margin: 'auto' }}>
                { this.state.repeatError ?
                  <Label basic color="red" pointing="left">Passwords do not match!</Label>
                  : ''
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={leftWidth} style={{ margin: 'auto' }} />
              <Grid.Column width={centerWidth} style={{ margin: 'auto' }}>
                <Form.Button>Register</Form.Button>
              </Grid.Column>
              <Grid.Column style={{ margin: 'auto' }} />
            </Grid.Row>
          </Grid>
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
