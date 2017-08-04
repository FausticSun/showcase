import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { check, Match } from 'meteor/check';

const Showcases = new Mongo.Collection('showcases');

export const Tag = Class.create({
  name: 'Tag',
  fields: {
    left: String,
    top: String,
    itemName: String,
    itemURL: String,
  },
});

export const Showcase = Class.create({
  name: 'ShowcaseCard',
  collection: Showcases,
  fields: {
    title: String,
    description: String,
    tags: [Tag],
    hubName: String,
    imageSrc: String,
    likes: {
      type: [String],
      default: [],
    },
    userId: {
      type: String,
    },
    userName: {
      type: String,
      transient: true,
    },
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt',
    },
  },
  events: {
    afterInit(e) {
      const doc = e.currentTarget;
      const user = Meteor.users.findOne(doc.userId);
      if (user) {
        doc.userName = user.profile.name;
      } else {
        doc.userName = '[DELETED]';
      }
    },
  },
  meteorMethods: {
    insert(callback) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      this.userId = Meteor.userId();
      this.save(callback);
    },
    toggleLike() {
      const liker = Meteor.userId();
      if (this.likes.indexOf(liker) === -1) {
        Showcase.update(this._id, { $push: { likes: liker } });
      } else {
        Showcase.update(this._id, { $pull: { likes: liker } });
      }
    },
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

  'showcases.likePost'(showcaseId) {
    check(showcaseId, String);
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
    return Showcase.find({ _id: id });
  });
  Meteor.publish('showcases.allPost', () => Showcase.find());
}
