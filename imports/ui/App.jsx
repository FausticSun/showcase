import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Canvases } from '../api/canvases.js';

import Canvas from './Canvas.jsx';
// App component - represents the whole app
class App extends Component {
  renderCanvas() {
    return this.props.canvases.map(canvas => (
      <Canvas key={canvas._id} canvas={canvas} />
    ));
  }

  render() {
    return (
      <div className="container">
        <div>
          {this.renderCanvas()}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default createContainer(() => ({
  canvases: Canvases.find({}, { sort: { createdAt: -1 } }).fetch(),
  currentUser: Meteor.user(),
}), App);
