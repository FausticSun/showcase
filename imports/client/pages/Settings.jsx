import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Dimmer, Loader, Header, Icon, Form, Image, Button } from 'semantic-ui-react';
import { FlowRouter } from 'meteor/kadira:flow-router';

const profilePicDisplayStyle = {
  margin: 'auto',
  width: '200px',
  height: '200px',
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
    };
  }
  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
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
  updateUserSettings = () => {
    if (this.state.name) {
      Meteor.users.update(Meteor.userId(), { $set: { 'profile.name': this.state.name } });
    }
    if (this.state.password) {
      Accounts.changePassword(this.state.oldPassword, this.state.password);
    }
    if (this.state.tempProfilePic) {
      Meteor.users.update(Meteor.userId(), { $set: { 'profile.profilePic': this.state.tempProfilePic } });
    }
    FlowRouter.go('/');
  };
  render() {
    const { currentUser } = this.props;
    const { name, password, userName, repeatPassword } = this.state;

    let $profilePic = '';
    if (!currentUser) {
      $profilePic = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif';
    } else if (!this.state.editPic) {
      $profilePic = this.props.currentUser.profile.profilePic;
    } else {
      $profilePic = this.state.tempProfilePic;
    }

    return (
      <article className="postWrapper">
        { currentUser ?
          <div>
            <Header as="h2" icon >
              <Icon name="settings" />
              Account Settings
              <Header.Subheader>
                Hi {this.props.currentUser.profile.name}, Manage your preferences
              </Header.Subheader>
            </Header>
            <Image src={$profilePic} shape="circular" style={profilePicDisplayStyle} />
            <input
              type="file"
              ref={r => (this.file = r)}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={this.imageUploadHandler}
            />
            <Button primary onClick={() => this.file.click()}>
              Choose another profile picture
            </Button>
            <Form size="large" onSubmit={this.updateUserSettings} >
              <Form.Input name="name" value={name} label="Edit Name" placeholder={currentUser.profile.name} onChange={this.onChangeHandler} />
              <Form.Input name="oldPassword" value={password} label="Old Password" type="password" placeholder="Old Password" onChange={this.onChangeHandler} />
              <Form.Input name="password" value={password} label="Password" type="password" placeholder="Password" onChange={this.onChangeHandler} />
              <Form.Input name="repeatPassword" value={repeatPassword} label="Repeat Password" type="password" placeholder="Repeat Password" onChange={this.onChangeHandler} />
              <Form.Button>Update Settings</Form.Button>
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
