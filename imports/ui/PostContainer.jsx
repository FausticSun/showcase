/* global PostContainer:true */
/* exported PostContainer */

import { createContainer } from 'meteor/react-meteor-data';
import { Canvases } from '../api/canvases.js';
import Post from './Post.jsx';

export default PostContainer = createContainer(({ postId }) => {
  const canvases = Canvases.find({ _id: postId }).fetch();
  return {
    canvases,
  };
}, Post);
