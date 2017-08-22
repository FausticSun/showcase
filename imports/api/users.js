import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('allUserData', function () {
    return Meteor.users.find({}, { fields: { profile: 1, username: 1, _id: 1 } });
  });
}

if (Meteor.isClient) {
  Tracker.autorun(function () {
    Meteor.subscribe('allUserData');
  });
}
