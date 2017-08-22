import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Showcase } from '../../api/showcases.js';
import ShowcaseCard from '../components/showcase/ShowcaseCard.jsx';
import DisqusThread from '../components/DisqusThread.jsx';

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
      <div>
        <ShowcaseCard showcase={this.props.showcase} />
        <DisqusThread
          id={FlowRouter.current().path}
          title={this.props.showcase.title}
          path={FlowRouter.current().path}
        />
      </div>
    );
  }
}

Post.propTypes = {
  loading: PropTypes.bool.isRequired,
  showcase: PropTypes.instanceOf(Showcase),
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
    showcase: Showcase.findOne(),
  };
}, Post);
