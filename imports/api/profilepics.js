import { FilesCollection } from 'meteor/ostrio:files';
import { check } from 'meteor/check';

const ProfilePics = new FilesCollection({
  collectionName: 'ProfilePics',
});

if (Meteor.isServer) {
  Meteor.publish('files.profilepics.singlePost', (postId) => {
    check(postId, String);
    return ProfilePics.find({ meta: { postId } }).cursor;
  });

  Meteor.publish('files.profilepics.all', function () {
    return ProfilePics.find().cursor;
  });
  ProfilePics.allowClient();
}

export default ProfilePics;
