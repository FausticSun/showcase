import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Canvases } from '../api/canvases.js';

import Canvas from './Canvas.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// App component - represents the whole app
export default class Hub extends Component {
  constructor(props) {
    super(props);
  }
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
