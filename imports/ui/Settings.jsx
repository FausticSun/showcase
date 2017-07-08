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
  toggleEdit() {
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
        <button onClick={this.toggleEdit.bind(this)}>EDIT</button>
      </div>);
    }
    return (
      <div>
        <form>
          <input
            ref="textInput"
            placeholder={this.props.currentUser.username}
          />
        </form>
        <button onClick={this.toggleEdit.bind(this)}>SAVE</button>
      </div>
    );
  }
  render() {
    const { currentUser } = this.props;
    const lelflag = false;
    return (
      <article className="postWrapper">
        { currentUser ?
          <div>
            <h1>Settings</h1>
            <div>
              <div><label>Name:</label>
                {this.renderEditName()}
              </div>

              <div><label>Password:</label></div>
            </div>
          </div>
        : <div>LOADING GIF</div> }
      </article>
    );
  }
}
