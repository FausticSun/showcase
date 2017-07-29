import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Header, Icon } from 'semantic-ui-react';
import Showcases from '../../../api/showcases.js';
import Showcase from './Showcase.jsx';

const showcaseListStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

class ShowcaseList extends Component {
  renderShowcaseCards() {
    if (!this.props.showcases.length) {
      return (
        <Header as="h1" icon>
          <Icon name="upload" />
          There are no showcases
          <Header.Subheader>
            Upload one!
          </Header.Subheader>
        </Header>
      );
    }
    return this.props.showcases.map(showcase => (
      <Showcase
        showcaseData={showcase}
        key={showcase._id}
      />
    ));
  }

  render() {
    return (
      <div style={showcaseListStyle}>
        { this.props.loading ? null : this.renderShowcaseCards()}
      </div>
    );
  }
}

ShowcaseList.propTypes = {
  loading: PropTypes.bool.isRequired,
  showcases: PropTypes.arrayOf(PropTypes.shape(
    {
      createdAt: PropTypes.date,
      tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })),
      hubName: PropTypes.string,
      imageSrc: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.string),
      userId: PropTypes.string,
    },
  )).isRequired,
};

ShowcaseList.defaultProps = {
  showcases: null,
  images: null,
};

export default createContainer(({ hubName }) => {
  const showcasesSub = Meteor.subscribe('showcases.allPost');
  const imageSub = Meteor.subscribe('files.images.allPost');
  return {
    loading: !showcasesSub.ready() && !imageSub.ready(),
    showcases: hubName ?
      Showcases.find({ hubName }, { sort: { createdAt: -1 } }).fetch() :
      Showcases.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, ShowcaseList);
