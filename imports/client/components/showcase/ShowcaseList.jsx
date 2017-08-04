import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Header, Icon } from 'semantic-ui-react';
import { Showcase } from '../../../api/showcases.js';
import ShowcaseCard from './ShowcaseCard.jsx';

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
      <ShowcaseCard
        showcase={showcase}
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
  showcases: PropTypes.arrayOf(
    PropTypes.instanceOf(Showcase)).isRequired,
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
      Showcase.find({ hubName }, { sort: { createdAt: -1 } }).fetch() :
      Showcase.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, ShowcaseList);
