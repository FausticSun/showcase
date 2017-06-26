import React, { Component, PropTypes } from 'react';
import { Canvases } from '../api/canvases.js';
import Tag from './Tag.jsx';

// Canvas component - represents a single todo item
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    const imgheight = this.props.canvas.height;
    const imgwidth = this.props.canvas.width;
    const newheight = imgheight * 500/imgwidth;
    this.divStyle = {
      height: newheight+ 'px',
    };
  }
  delete() {
    Canvases.remove(this.props.canvas._id);
  }
  renderTags() {
    return this.props.canvas.tags.map((index) => (
      <Tag key={index} number={index} />
    ));
  }
  render() {
    return (
      <div className='canvasWrapper'>
        <div className='canvastagholder' style={this.divStyle}>
          {this.renderTags()};
        </div>
        <img className='canvasimage' src={this.props.canvas.text} />
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
