import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {MainLayout} from './layouts/MainLayout.jsx';
import App from '../ui/App.jsx';
import Upload from '../ui/Upload.jsx';
import Post from '../ui/Post.jsx';
import PostContainer from '../ui/PostContainer.jsx';
FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
        content: (<App />)
    })
  }
})
FlowRouter.route('/upload', {
  action() {
    mount(MainLayout, {
        content: (<Upload />)
    })
  }
})

FlowRouter.route('/p/:postId', {
  action: function(params) {
    console.log(params.postId)
    let tempCanvas = Meteor.call('canvases.retrieve', params.postId);
    mount(MainLayout, {
        content: (<PostContainer postId={params.postId}/>)
    })
  }
})
