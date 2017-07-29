import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

const Showcases = new Mongo.Collection('showcases', {
  transform: (showcase) => {
    const user = Meteor.users.findOne(showcase.userId);
    let tShowcase;
    if (user) {
      tShowcase = { ...showcase, userName: user.profile.name };
    } else {
      tShowcase = { ...showcase, userName: '[User not found]' };
    }
    return tShowcase;
  },
});

Meteor.methods({
  'showcases.insert'(showcase) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    check(showcase, {
      tags: Match.Any,
      title: String,
      description: String,
      hubName: String,
      imageSrc: String,
    });

    return Showcases.insert({
      createdAt: new Date(),
      tags: showcase.tags,
      title: showcase.title,
      description: showcase.description,
      imageSrc: showcase.imageSrc,
      hubName: showcase.hubName,
      likes: [],
      userId: Meteor.userId(),
    });
  },

  'showcases.remove'(taskId) {
    check(taskId, String);
    Showcases.remove(taskId);
  },

  'showcases.likePost'(argArray) {
    check(argArray, Array);

    const liker = argArray[0];
    const taskId = argArray[1];
    const likeArray = Showcases.findOne({ _id: taskId }).likes;
    if (likeArray.indexOf(liker) === -1) {
      likeArray.push(liker);
    } else {
      likeArray.splice(likeArray.indexOf(liker), 1);
    }
    Showcases.update({ _id: taskId }, { $set: { likes: likeArray } });
  },
});

if (Meteor.isServer) {
  Meteor.publish('showcases.singlePost', (id) => {
    check(id, String);
    return Showcases.find({ _id: id });
  });
  Meteor.publish('showcases.allPost', () => Showcases.find());
}

export default Showcases;
