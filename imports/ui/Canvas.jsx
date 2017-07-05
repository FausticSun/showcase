import React, { Component, PropTypes } from 'react';
import { Canvases } from '../api/canvases.js';
import Tag from './Tag.jsx';
import Label from './Label.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';
// Canvas component - represents a single canvas
class Canvas extends Component {
  constructor(props) {
    super(props);

    // Resizing the canvas picture to the proportionate height
    const imgheight = this.props.canvas.height;
    const imgwidth = this.props.canvas.width;
    const newheight = imgheight * 500 / imgwidth;
    this.proportionatePicHeight = {
      height: `${newheight}px`,
    };
    this.URL = `/p/${this.props.canvas._id}`;
    console.log(`Canvas hub: ${this.props.canvas.hubName}`);
  }
  delete() {
    // Using API cos Insecure removed
    Meteor.call('canvases.remove', this.props.canvas._id);
  }
  likePost() {
    console.log(Meteor.user());
    Meteor.call('canvases.likePost', [this.props.currentUser.username, this.props.canvas._id]);
  }
  renderTags() {
    return this.props.canvas.tags.map(index => (
      <Tag key={index} objArray={index} />
    ));
  }
  renderLabels() {
    return this.props.canvas.tags.map(index => (
      <Label key={index} objArray={index} />
    ));
  }
  render() {
    return (
      <article className="postWrapper">
        <div className="postContents">
          <div className="canvasUserName">
            {this.props.canvas.username}
            <a href={this.URL}>See this post in full</a>
          </div>
          <div className="canvasWrapper">
            <div className="canvastagholder" style={this.proportionatePicHeight}>
              {this.renderTags()}
            </div>
            <img className="canvasimage" src={this.props.canvas.imgData} />
            <div className="deleteHolder">
              { Meteor.user() && this.props.currentUser.username == this.props.canvas.username ?
                <button className="delete" onClick={this.delete.bind(this)}>
                  &times; USER DELETE
                </button>
              : '' }
              <button className="delete" onClick={this.delete.bind(this)}>
                &times; MASTER DELETE
              </button>
            </div>
          </div>
          <div className="likesWrapper">
            { Meteor.user() ?
              <div>
                { this.props.canvas.likes.indexOf(this.props.currentUser.username) === -1 ?
                  <button onClick={this.likePost.bind(this)}>Like</button> :
                  <button onClick={this.likePost.bind(this)}>Unlike</button>
              }
              </div> : '' }
            {this.props.canvas.likes.length} people like this
          </div>
          <div className="labelWrapper">
            <ol>
              {this.renderLabels()}
            </ol>
          </div>
          <div className="hubs">
            As found in Hub : {this.props.canvas.hubName}
          </div>
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

export default createContainer(() => ({
  canvases: Canvases.find({}, { sort: { createdAt: -1 } }).fetch(),
  currentUser: Meteor.user(),
}), Canvas);
