import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Settings from './Settings.jsx';

export default SettingsContainer = createContainer(({ userId }) => {
  const currentUser = Meteor.user();
  console.log(Meteor.user());

  return {
    currentUser,
  };
}, Settings);
