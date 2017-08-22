import { FilesCollection } from 'meteor/ostrio:files';
import { check } from 'meteor/check';

const Images = new FilesCollection({
  collectionName: 'Images',
  storagePath: '/data/Meteor/uploads',
});

if (Meteor.isServer) {
  Meteor.publish('files.images.singlePost', (postId) => {
    check(postId, String);
    return Images.find({ meta: { postId } }).cursor;
  });
  Meteor.publish('files.images.allPost', function () {
    return Images.find().cursor;
  });
  Images.allowClient();
}

export default Images;
