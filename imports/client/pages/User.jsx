import React from 'react';
import { PropTypes } from 'prop-types';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';

const User = props => (
  <div>
    <ShowcaseList username={props.username} />
  </div>
);

User.propTypes = {
  username: PropTypes.string.isRequired,
};

export default User;
