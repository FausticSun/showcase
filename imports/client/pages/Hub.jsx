import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Header, Image, Divider } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';
import Hubs from '../../api/hubs.js';
import SubscribeBtn from '../components/SubscribeBtn.jsx';

const hubStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: props.currentUser ?
        props.currentUser.profile.subscriptions.includes(props.hubName) :
        false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subscribed: nextProps.currentUser ?
        nextProps.currentUser.profile.subscriptions.includes(nextProps.hubName) :
        false,
    });
  }

  subscribeHandler = () => {
    if (!this.state.subscribed) {
      Meteor.users.update(Meteor.userId(), { $push: { 'profile.subscriptions': this.props.hubName } });
    } else {
      Meteor.users.update(Meteor.userId(), { $pull: { 'profile.subscriptions': this.props.hubName } });
    }
  };

  render() {
    const hubObj = Hubs.find(obj => obj.hubName === this.props.hubName);
    return (
      <div>
        {
          this.props.currentUser ?
            <SubscribeBtn
              isSubscribed={this.state.subscribed}
              subscribe={this.subscribeHandler}
            /> :
            null
        }
        <Header as="h2" style={hubStyle}>
          <Image src={hubObj.image} />
          {` ${hubObj.hubName}`}
          <Header.Subheader>
            {hubObj.fullName}
          </Header.Subheader>
        </Header>
        <Divider section />
        <ShowcaseList hubName={this.props.hubName} />
      </div>
    );
  }
}

Hub.propTypes = {
  hubName: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      profilePic: PropTypes.string,
      subscriptions: PropTypes.arrayOfString,
    }),
  }),
};

Hub.defaultProps = {
  currentUser: null,
};

export default createContainer(() => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, Hub);
