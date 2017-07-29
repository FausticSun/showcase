import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Showcases } from '../api/showcases.js';
import Tag from './Tag.jsx';
import Label from './Label.jsx';

// Showcase component - represents a single showcase
class Canvas extends Component {
  constructor(props) {
    super(props);

    // Resizing the showcase picture to the proportionate height
    const imgheight = this.props.showcase.height;
    const imgwidth = this.props.showcase.width;
    const newheight = (imgheight * 500) / imgwidth;
    this.proportionatePicHeight = {
      height: `${newheight}px`,
    };
    this.URL = `/p/${this.props.showcase._id}`;
    this.canvasUserProfileLink = `/${this.props.showcase.username}`;
  }
  delete = () => {
    // Using API cos Insecure removed
    Meteor.call('canvases.remove', this.props.showcase._id);
  }
  likePost = () => {
    Meteor.call('canvases.likePost', [this.props.currentUser.username, this.props.showcase._id]);
  }
  renderTags() {
    return this.props.showcase.tags.map(index => (
      <Tag key={index} objArray={index} />
    ));
  }
  renderLabels() {
    return this.props.showcase.tags.map(index => (
      <Label key={index} objArray={index} />
    ));
  }
  render() {
    return (
      <article className="postWrapper">
        <div className="postContents">
          <div className="canvasUserName">
            <a href={this.canvasUserProfileLink}>{this.props.showcase.username}</a>
            <a href={this.URL}>See this post in full</a>
          </div>
          <div className="canvasWrapper">
            <div className="canvastagholder" style={this.proportionatePicHeight}>
              {this.renderTags()}
            </div>
            <img className="canvasimage" src={this.props.showcase.imgData} alt="" />
            <div className="deleteHolder">
              { Meteor.user() && this.props.currentUser.username === this.props.showcase.username ?
                <button className="delete" onClick={this.delete}>
                  &times; USER DELETE
                </button>
              : '' }
              <button className="delete" onClick={this.delete}>
                &times; MASTER DELETE
              </button>
            </div>
          </div>
          <div className="likesWrapper">
            { Meteor.user() ?
              <div>
                { this.props.showcase.likes.indexOf(this.props.currentUser.username) === -1 ?
                  <button onClick={this.likePost}>Like</button> :
                  <button onClick={this.likePost}>Unlike</button>
              }
              </div> : '' }
            {this.props.showcase.likes.length} people like this
          </div>
          <div className="labelWrapper">
            <ol>
              {this.renderLabels()}
            </ol>
          </div>
          <div className="hubs">
            As found in Hub : {this.props.showcase.hubName}
          </div>
        </div>
      </article>
    );
  }
}

Canvas.propTypes = {
  // This component gets the showcase to display through a React prop.
  // We can use propTypes to indicate it is required
  showcase: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    username: PropTypes.string,
    _id: PropTypes.string,
    likes: PropTypes.array,
    hubName: PropTypes.string,
    imgData: PropTypes.string,
    tags: PropTypes.array,
  }).isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

Canvas.defaultProps = {
  currentUser: null,
};

export default createContainer(() => ({
  canvases: Canvases.find({}, { sort: { createdAt: -1 } }).fetch(),
  currentUser: Meteor.user(),
}), Canvas);
