import { FilesCollection } from 'meteor/ostrio:files';

const ProfilePics = new FilesCollection({
  collectionName: 'ProfilePics',
});

if (Meteor.isClient) {
  Meteor.subscribe('files.profilepics.all');
}

if (Meteor.isServer) {
  Meteor.publish( , function () {
    return ProfilePics.find().cursor;
  });
  ProfilePics.allowClient();
}

export default ProfilePics;
