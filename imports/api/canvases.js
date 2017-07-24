import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match  } from 'meteor/check';

export const Canvases = new Mongo.Collection('canvases');

Meteor.methods({
  'canvases.insert'(canvas) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    check(canvas, {
      imgData: String,
      tags: Match.Any,
      width: Number,
      height: Number,
      hubName: String,
    });

    Canvases.insert({
      imgData: canvas.imgData,
      createdAt: new Date(), // current time
      tags: canvas.tags,
      width: canvas.width,
      height: canvas.height,
      likes: [],
      hubName: canvas.hubName,
      owner: Meteor.userId(), // _id of logged in user
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
