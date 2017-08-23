import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Dimmer, Loader, Header, Icon } from 'semantic-ui-react';
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
        { this.props.loading ?
          <Dimmer active>
            <Loader content='Fetching Showcases' />
          </Dimmer>
          :
          this.renderShowcaseCards()}
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

export default createContainer(({ hubName, username }) => {
  const showcasesSub = Meteor.subscribe('showcases.allPost');
  const imageSub = Meteor.subscribe('files.images.allPost');
  const userSub = Meteor.subscribe('allUserData');
  let showcases;
  if (hubName) {
    showcases = Showcase.find({ hubName }, { sort: { createdAt: -1 } }).fetch();
  } else if (username) {
    const user = Meteor.users.findOne({ username: username.trim() });
    const userId = user ? user._id : 'null';
    showcases = Showcase.find(
      { userId }, { sort: { createdAt: -1 } },
    ).fetch();
  } else {
    showcases = Showcase.find({}, { sort: { createdAt: -1 } }).fetch();
  }
  return {
    loading: !showcasesSub.ready() && !imageSub.ready() && !userSub.ready(),
    showcases,
  };
}, ShowcaseList);
