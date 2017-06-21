import React, { Component, PropTypes } from 'react';
import { Canvases } from '../api/canvases.js';

// Canvas component - represents a single todo item
export default class Canvas extends Component {
  delete() {
    Canvases.remove(this.props.canvas._id);
  }
  render() {
    return (
      <div id='canvasWrapper'>
        <img id='canvasimage' src={this.props.canvas.text} />
        <button className="delete" onClick={this.delete.bind(this)}>
          &times;
        </button>
      </div>
    );
  }
}

Canvas.propTypes = {
  // This component gets the canvas to display through a React prop.
  // We can use propTypes to indicate it is required
  canvas: PropTypes.object.isRequired,
};
