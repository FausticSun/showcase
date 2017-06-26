import React, { Component, PropTypes } from 'react';
import { Canvases } from '../api/canvases.js';
import Tag from './Tag.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';
// Canvas component - represents a single canvas
class Canvas extends Component {
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
    Meteor.call('canvases.remove',this.props.canvas._id);
    // Canvases.remove(this.props.canvas._id);
  }
  renderTags() {
    return this.props.canvas.tags.map((index) => (
      <Tag key={index} number={index} />
    ));
  }
  render() {
    return (
      <article className='postWrapper'>
        <div>{this.props.canvas.username}</div>
        <div className='canvasWrapper'>
          <div className='canvastagholder' style={this.divStyle}>
            {this.renderTags()}
          </div>
          <img className='canvasimage' src={this.props.canvas.imgData} />
          { this.props.currentUser.username==this.props.canvas.username ?
            <button className="delete" onClick={this.delete.bind(this)}>
              &times;
            </button>
          : ''}
          <button className="delete" onClick={this.delete.bind(this)}>
            &times; MASTER DELETE
          </button>
        </div>
      </article>
    );
  }
}

Canvas.propTypes = {
  // This component gets the canvas to display through a React prop.
  // We can use propTypes to indicate it is required
  canvas: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    canvases: Canvases.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, Canvas);
