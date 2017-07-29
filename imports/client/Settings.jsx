import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Header, Icon, Form, Image, Button } from 'semantic-ui-react';

const settingsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};
const profilePicDisplayStyle = {
  margin: 'auto',
  width: '200px',
  height: '200px',
}
// Settings component - represents a single canvas
export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(`Person: ${Meteor.userId()}`);
    const user = Meteor.users.findOne(Meteor.userId());
    console.log(this.props.currentUser);
    console.log(user);
    this.state = {
      editName: false,
      name: '',
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
    this.setState({
      editPic: true,
      tempProfilePic: window.URL.createObjectURL(e.target.files[0]),
    });
  };
  updateUserSettings = () => {
    Accounts.createUser({
      name: this.state.name,
      username: this.state.userName,
      password: this.state.password,
    });
    FlowRouter.go('/');
  };
  updateState = () => {
    console.log(Meteor.user());
  };
  render() {
    const { currentUser } = this.props;
    const { name, password, userName, repeatPassword, tempProfilePic } = this.state;

    let $profilePic = '';
    if(!currentUser) {
      $profilePic = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
    } else if(!this.state.editPic){
      $profilePic = this.props.currentUser.profile.profilePic;
    } else{
      $profilePic = this.state.tempProfilePic;
    }

    return (
      <article style={settingsStyle} className="postWrapper">
        { currentUser ?
        <div>
          <Header as='h2' icon >
            <Icon name='settings' />
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
          <Button primary onClick={() => this.file.click()}>Choose another profile picture</Button>
          <Form size="large" onSubmit={this.updateUserSettings} >
            <Form.Input name="name" value={name} label="Edit Name" placeholder={currentUser.profile.name} onChange={this.onChangeHandler} />
            <Form.Input name="userName" value={userName} label="Edit Username" placeholder={currentUser.username} onChange={this.onChangeHandler} />
            <Form.Input name="password" value={password} label="Password" type="password" placeholder="Password" onChange={this.onChangeHandler} />
            <Form.Input name="repeatPassword" value={repeatPassword} label="Repeat Password" type="password" placeholder="Repeat Password" onChange={this.onChangeHandler} />
            <Form.Button>Update Settings</Form.Button>
          </Form>
        </div>
        : <div>LOADING GIF</div> }
      </article>
    );
  }
}

Settings.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

Settings.defaultProps = {
  currentUser: null,
};