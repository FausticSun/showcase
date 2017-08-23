import React from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Dimmer, Loader } from 'semantic-ui-react';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';

const Home = (props) => {
  const showcaseList = props.currentUser ?
    (<ShowcaseList hubArray={props.currentUser.profile.subscriptions} />) :
    (<ShowcaseList />);

  return (
    <div>
      {
        props.loggingIn ?
          <Dimmer active>
            <Loader />
          </Dimmer> :
          showcaseList
      }
    </div>
  );
};

Home.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      profilePic: PropTypes.string,
      subscriptions: PropTypes.arrayOfString,
    }),
  }),
  loggingIn: PropTypes.bool.isRequired,
};

Home.defaultProps = {
  currentUser: null,
};

export default createContainer(() => {
  const currentUser = Meteor.user();
  const loggingIn = Meteor.loggingIn();
  return {
    currentUser,
    loggingIn,
  };
}, Home);
