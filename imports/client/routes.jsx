import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MainLayout } from './layouts/MainLayout.jsx';
import App from '../ui/App.jsx';
import Upload from '../ui/Upload.jsx';
import PostContainer from '../ui/PostContainer.jsx';
import Hub from '../ui/Hub.jsx';
import Login from '../ui/Login.jsx';

import HubContainer from '../ui/HubContainer.jsx';
import ProfileContainer from '../ui/ProfileContainer.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<App />),
    });
  },
});
FlowRouter.route('/upload', {
  action() {
    mount(MainLayout, {
      content: (<Upload />),
    });
  },
});

FlowRouter.route('/p/:postId', {
  action(params) {
    mount(MainLayout, {
      content: (<PostContainer postId={params.postId} />),
    });
  },
});

FlowRouter.route('/hub/:hubName', {
  action(params) {
    mount(MainLayout, {
        content: (<HubContainer hubName={params.hubName}/>)
    })
  }
})
FlowRouter.route('/profile/:profileName', {
  action(params) {
    mount(MainLayout, {
        content: (<ProfileContainer profileName={params.profileName}/>)
    })
  }
})

FlowRouter.route('/login', {
  name: 'login',
  action: function() {
    mount(MainLayout, {
        content: (<Login />)
    })
  }
});
