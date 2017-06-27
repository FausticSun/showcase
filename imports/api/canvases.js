import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Canvases = new Mongo.Collection('canvases');


Meteor.methods({
  'canvases.insert'(insertArray) {
    imgData = insertArray[0];
    tags = insertArray[1];
    width = insertArray[2];
    height = insertArray[3];
    check(imgData, String);
    likes = [];
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Canvases.insert({
      imgData,
      createdAt: new Date(), // current time
      tags,
      width,
      height,
      likes,
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,
    });
  },
  'canvases.remove'(taskId) {
    check(taskId, String);
    Canvases.remove(taskId);
  },
  'canvases.likePost'(argArray) {
    var liker = argArray[0];
    var taskId = argArray[1] +'';
    var likeArray = Canvases.findOne({"_id":taskId}).likes;
    if(likeArray.indexOf(liker)===-1){
      likeArray.push(liker);
    } else{
      likeArray.splice(likeArray.indexOf(liker) ,1);
    }
    Canvases.update({'_id': taskId}, {$set: {likes:likeArray}});
  },
});
