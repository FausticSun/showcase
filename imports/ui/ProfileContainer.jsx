import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Canvases } from '../api/canvases.js';
import Profile from './Profile.jsx';
import Canvas from './Canvas.jsx';

export default ProfileContainer = createContainer(({ profileName }) => {
  console.log(`Container:${profileName}`);
  const canvases = Canvases.find(
    { "username" : profileName },
    { sort: { createdAt: -1 } },
  ).fetch();
  const profile = profileName;
  return {
    canvases,
    profile,
  };
}, Profile);
