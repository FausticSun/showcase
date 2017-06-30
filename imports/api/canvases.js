import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Canvases = new Mongo.Collection('canvases');



Meteor.methods({
  'canvases.insert'(insertArray) {
    check(insertArray, Array);
    let imgData = insertArray[0];
    let tags = insertArray[1];
    let width = insertArray[2];
    let height = insertArray[3];
    let hubName = insertArray[4];
    let likes = [];
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

    let liker = argArray[0];
    let taskId = argArray[1] +'';
    let likeArray = Canvases.findOne({"_id":taskId}).likes;
    if(likeArray.indexOf(liker)===-1){
      likeArray.push(liker);
    } else{
      likeArray.splice(likeArray.indexOf(liker) ,1);
    }
    Canvases.update({'_id': taskId}, {$set: {likes:likeArray}});
  },
  'canvases.retrieve'(canvasId) {
    check(canvasId, String);

    return Canvases.findOne("_id" : canvasId);
  },
});
