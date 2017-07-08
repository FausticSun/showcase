import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Canvases = new Mongo.Collection('canvases');

Meteor.methods({
  'canvases.insert'(insertArray) {
    check(insertArray, Array);
    const imgData = insertArray[0];
    const tags = insertArray[1];
    const width = insertArray[2];
    const height = insertArray[3];
    const hubName = insertArray[4];
    const likes = [];
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Canvases.insert({
      imgData,
      createdAt: new Date(), // current time
      tags,
      width,
      height,
      likes,
      hubName,
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,
    });
  },
  'canvases.remove'(taskId) {
    check(taskId, String);
    Canvases.remove(taskId);
  },
  'canvases.likePost'(argArray) {
    check(argArray, Array);

    const liker = argArray[0];
    const taskId = argArray[1];
    const likeArray = Canvases.findOne({ _id: taskId }).likes;
    if (likeArray.indexOf(liker) === -1) {
      likeArray.push(liker);
    } else {
      likeArray.splice(likeArray.indexOf(liker), 1);
    }
    Canvases.update({ _id: taskId }, { $set: { likes: likeArray } });
  },
  'canvases.retrieve'(canvasId) {
    check(canvasId, String);

    return Canvases.findOne({ _id: canvasId });
  },
});
