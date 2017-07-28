import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Canvases from '../../api/canvases.js';
import Images from '../../api/images.js';
import Canvas from '../components/Canvas.jsx';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null,
    };
  }

  render() {
    if (this.props.loading) {
      return null;
    } else if (!this.props.canvas) {
      FlowRouter.go('/404');
      return null;
    }
    return (
      <Canvas canvasData={this.props.canvas} imageSrc={this.props.imageSrc} />
    );
  }
}

Post.propTypes = {
  loading: PropTypes.bool.isRequired,
  canvas: PropTypes.shape({
    createdAt: PropTypes.date,
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })),
    likes: PropTypes.arrayOf(PropTypes.string),
    hubName: PropTypes.string,
    userId: PropTypes.string,
  }),
  imageSrc: PropTypes.string,
};

Post.defaultProps = {
  canvas: null,
  imageSrc: null,
};

export default createContainer(({ id }) => {
  const canvasSub = Meteor.subscribe('canvases.singlePost', id);
  const imageSub = Meteor.subscribe('files.images.singlePost', id);
  return {
    loading: !canvasSub.ready() && !imageSub.ready(),
    canvas: Canvases.findOne(),
    imageSrc: Images.findOne().link(),
  };
}, Post);
