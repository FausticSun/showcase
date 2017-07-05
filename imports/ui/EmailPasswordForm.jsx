import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Canvases } from '../api/canvases.js';

import Canvas from './Canvas.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// App component - represents the whole app
class EmailPasswordForm extends Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onInput2 = this.onInput2.bind(this);

    // init state
    this.state = {
      input: '',
      pw: '',
    };
  }
  onInput(e) {
    e.preventDefault();
    this.setState({
      input: this.refs.email.value.trim()
    });
    console.log(this.state.input);

  }
  onInput2(e) {
    e.preventDefault();
    this.setState({
      pw: this.refs.password.value.trim()
    });
    console.log(this.state.pw);
  }

  // submit handler
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.input,this.state.pw);
  }
  render() {
    return (
      <form onSubmit={(e)=>this.onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input placeholder="Email" ref="email" className="form-control" onChange={(e)=>this.onInput(e)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input placeholder="Password" type="password" ref="password" className="form-control" onChange={(e)=>this.onInput2(e)}/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">SUBMIT</button>
        </div>
      </form>
    )
  }
}


EmailPasswordForm.propTypes = {
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, EmailPasswordForm);
