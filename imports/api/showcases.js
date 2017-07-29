import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

const Showcases = new Mongo.Collection('showcases');

Meteor.methods({
  'showcases.insert'(showcase) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    check(showcase, {
      tags: Match.Any,
      hubName: String,
      imageSrc: String,
    });

    return Showcases.insert({
      createdAt: new Date(),
      tags: showcase.tags,
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

  'showcases.likePost'(showcaseId) {
    const liker = Meteor.userId();
    const likeArray = Showcases.findOne({ _id: showcaseId }).likes;
    if (likeArray.indexOf(liker) === -1) {
      Showcases.update({ _id: showcaseId }, { $push: { likes: liker } });
    } else {
      Showcases.update({ _id: showcaseId }, { $pull: { likes: liker } });
    }
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
