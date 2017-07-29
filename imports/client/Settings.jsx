import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

// Settings component - represents a single canvas
export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(`Person: ${Meteor.userId()}`);
    const user = Meteor.users.findOne(Meteor.userId());
    console.log(this.props.currentUser);
    console.log(user);
    this.state = { editName: false };
  }
  toggleEdit = () => {
    console.log(`Edit: ${this.editName}`);
    if (this.state.editName) {
      this.setState({ editName: false });
    } else {
      this.setState({ editName: true });
    }
  }
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
    return (
      <article className="postWrapper">
        { currentUser ?
          <div>
            <h1>Settings</h1>
            <div>
              <div><label htmlFor="name">Name:</label>
                {this.renderEditName()}
              </div>

              <div><label htmlFor="password">Password:</label></div>
            </div>
          </div>
        : <div>LOADING GIF</div> }
      </article>
    );
  }
}

Settings.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

Settings.defaultProps = {
  currentUser: null,
};