/* global ProfileContainer:true */
/* exported ProfileContainer */

import { createContainer } from 'meteor/react-meteor-data';
import { Showcases } from '../api/showcases.js';
import Profile from './Profile.jsx';

export default ProfileContainer = createContainer(({ profileName }) => {
  const canvases = Canvases.find(
    { username: profileName },
    { sort: { createdAt: -1 } },
  ).fetch();
  const profile = profileName;
  return {
    canvases,
    profile,
  };
}, Profile);
