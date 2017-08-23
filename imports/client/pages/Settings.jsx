import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Label, Dimmer, Loader, Header, Icon, Form, Image, Button, Grid } from 'semantic-ui-react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { leftWidth, centerWidth } from '../components/loginAndRegister/Register.jsx';

const profilePicDisplayStyle = {
  margin: 'auto',
  width: '180px',
  height: '180px',
};
const settingsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '65%',
  margin: 'auto',
};
// Settings component - represents a single canvas
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      name: '',
      oldPassword: '',
      password: '',
      userName: '',
      repeatPassword: '',
      imageURL: null,
      tempProfilePic: null,
      editPic: false,
      wrongOldPasswordError: false,
      passwordError: false,
      repeatError: false,
      clickedUpdate: false,
    };
  }
  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
    this.setState({
      wrongOldPasswordError: false,
      passwordError: false,
      repeatError: false,
      oldPasswordError: false,
      clickedUpdate: false,
    });
  };
  imageUploadHandler = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        editPic: true,
        tempProfilePic: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  changePwHandler = (error) => {
    if (error) {
      this.setState({
        wrongOldPasswordError: true,
      });
    } else {
      FlowRouter.go('/');
    }
  };
  updateUserSettings = () => {
    if (this.state.name) {
      Meteor.users.update(Meteor.userId(), { $set: { 'profile.name': this.state.name } });
    }
    if (this.state.tempProfilePic) {
      Meteor.users.update(Meteor.userId(), { $set: { 'profile.profilePic': this.state.tempProfilePic } });
    }
    if (this.state.password) {
      Accounts.changePassword(this.state.oldPassword, this.state.password, this.changePwHandler);
    }
    if (!this.state.password && (this.state.name || this.state.tempProfilePic)) {
      FlowRouter.go('/');
    }
  };
  trySubmit = () => {
    this.setState({ clickedUpdate: true });
    if (!this.state.oldPassword && (this.state.password || this.state.repeatPassword)) {
      this.setState({ oldPasswordError: true});
    } else if (this.state.password.length > 0 && this.state.password.length < 6) {
      this.setState({ passwordError: true });
    } else if (this.state.repeatPassword !== this.state.password) {
      this.setState({ repeatError: true });
    } else {
      this.updateUserSettings();
    }
  };
  render() {
    const { currentUser } = this.props;
    const { name, password, oldPassword, repeatPassword } = this.state;

    let $profilePic = '';
    if (!currentUser) {
      $profilePic = '/assets/img/Loading_icon.gif';
    } else if (!this.state.editPic) {
      $profilePic = this.props.currentUser.profile.profilePic;
    } else {
      $profilePic = this.state.tempProfilePic;
    }

    return (
      <article className="postWrapper">
        { currentUser ?
          <div style={settingsStyle}>
            <Header as="h1">
              <Icon name="settings" />
              <Header.Content>
                Account Settings
                <Header.Subheader>
                  Hi {this.props.currentUser.profile.name}, manage your preferences
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Image src={$profilePic} shape="circular" style={profilePicDisplayStyle} />
            <input
              type="file"
              ref={r => (this.file = r)}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={this.imageUploadHandler}
            />
            <Button size='medium' style={{margin:'10px'}} onClick={() => this.file.click()}>
              Choose another profile picture
            </Button>
            <Form size="large" onSubmit={this.trySubmit} >
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column style={{ margin: 'auto' }}>
                    <Header as="h4">Edit Name</Header>
                  </Grid.Column>
                  <Grid.Column width={centerWidth}>
                    <Form.Input name="name" value={name} placeholder={currentUser.profile.name} onChange={this.onChangeHandler} />
                  </Grid.Column>
                  <Grid.Column style={{ margin: 'auto' }}>
                    { this.state.usernameError ?
                      <Label basic color="red" pointing="left">Name cannot be empty!</Label>
                      : ''
                    }
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={leftWidth} style={{ margin: 'auto' }}>
                    <Header as="h4">Old Password</Header>
                  </Grid.Column>
                  <Grid.Column width={centerWidth}>
                    <Form.Input name="oldPassword" value={oldPassword} type="password" placeholder="Old Password" onChange={this.onChangeHandler} />
                  </Grid.Column>
                  <Grid.Column style={{ margin: 'auto' }}>
                    { this.state.oldPasswordError ?
                      <Label basic color="red" pointing="left">Enter your old password!</Label>
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
                    <Header as="h4">Repeat Password</Header>
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
                    { this.state.clickedUpdate ?
                      <Form.Button disabled>Update Settings</Form.Button>
                       :
                      <Form.Button>Update Settings</Form.Button>
                    }
                  </Grid.Column>
                  <Grid.Column style={{ margin: 'auto' }}>
                    { this.state.wrongOldPasswordError ?
                      <Label basic color="red" pointing="left">Error changing passwords!</Label>
                      : ''
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        :
          <Dimmer active>
            <Loader />
          </Dimmer>
        }
      </article>
    );
  }
}

Settings.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      profilePic: PropTypes.string,
    }),
  }),
};

Settings.defaultProps = {
  currentUser: null,
};

export default createContainer(() => {
  const currentUser = Meteor.user();

  return {
    currentUser,
  };
}, Settings);
