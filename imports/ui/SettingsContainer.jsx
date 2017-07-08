/* global SettingsContainer:true */
/* exported SettingsContainer */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Settings from './Settings.jsx';

export default SettingsContainer = createContainer(() => {
  const currentUser = Meteor.user();

  return {
    currentUser,
  };
}, Settings);
