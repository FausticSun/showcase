import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Header, Icon, Form } from 'semantic-ui-react';

const settingsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};
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
    };
  }
  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
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
  renderEditName() {
    if (!this.state.editName) {
      return (<div>{this.props.currentUser.username}
        <button onClick={this.toggleEdit}>EDIT</button>
      </div>);
    }
    return (
      <div>
        <form>
          <input
            ref={textInput => (this.textInput = textInput)}
            placeholder={this.props.currentUser.username}
          />
        </form>
        <button onClick={this.toggleEdit}>SAVE</button>
      </div>
    );
  }
  render() {
    const { currentUser } = this.props;
    const { name, password, userName, repeatPassword } = this.state;

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

          <Form size="large" onSubmit={this.updateUserSettings} onLoad={this.updateState()}>
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