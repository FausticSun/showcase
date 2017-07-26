import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Canvases = new Mongo.Collection('canvases');

Meteor.methods({
  'canvases.insert'(canvas) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    check(canvas, {
      tags: Match.Any,
      hubName: String,
    });

    return Canvases.insert({
      createdAt: new Date(),
      tags: canvas.tags,
      likes: [],
      hubName: canvas.hubName,
      userId: Meteor.userId(),
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
