import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Canvases } from '../api/canvases.js';
import Post from './Post.jsx';
import Canvas from './Canvas.jsx';

export default PostContainer = createContainer(({ postId }) => {
  const canvases = Canvases.find({"_id" : postId }).fetch()
  return {
    canvases
  };
}, Post);
