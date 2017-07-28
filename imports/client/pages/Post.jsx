import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Showcases from '../../api/showcases.js';
import Images from '../../api/images.js';
import Canvas from '../components/Showcase.jsx';

const postStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

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
    } else if (!this.props.showcase) {
      FlowRouter.go('/404');
      return null;
    }
    return (
      <div style={postStyle}>
        <Canvas canvasData={this.props.showcase} imageSrc={this.props.imageSrc} />
      </div>
    );
  }
}

Post.propTypes = {
  loading: PropTypes.bool.isRequired,
  showcase: PropTypes.shape({
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
  showcase: null,
  imageSrc: null,
};

export default createContainer(({ id }) => {
  const showcasesSub = Meteor.subscribe('showcases.singlePost', id);
  const imageSub = Meteor.subscribe('files.images.singlePost', id);
  return {
    loading: !showcasesSub.ready() && !imageSub.ready(),
    showcase: Showcases.findOne(),
    imageSrc: Images.findOne().link(),
  };
}, Post);
