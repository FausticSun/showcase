import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Dimmer, Loader, Header, Image, Divider } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';

const hubStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

class User extends Component {
  render () {
    return (
      <div>
        { !this.props.loading ?
          <Header as="h2" style={hubStyle}>
            <Image shape="circular" src={this.props.user.profile.profilePic} />
            {` @${this.props.user.username}`}
            <Header.Subheader>
              Showcases uploaded by {this.props.user.profile.name}
            </Header.Subheader>
          </Header>
          :
          <Dimmer active>
            <Loader />
          </Dimmer>}
        <Divider section />
        <ShowcaseList username={this.props.username} />
      </div>
    );
  }
}

User.propTypes = {
  loading: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      profilePic: PropTypes.string,
    }),
  }),
};

User.defaultProps = {
  user: null,
};
export default createContainer(({ username }) => {
  const userSub = Meteor.subscribe('allUserData');
  const user = Meteor.users.findOne({ username: username.trim() });
  return {
    loading: !userSub.ready(),
    user,
    username,
  };
}, User);

