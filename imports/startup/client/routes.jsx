import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MainLayout } from '../../client/layouts/MainLayout.jsx';
import App from '../../client/App.jsx';
import Upload from '../../client/Upload.jsx';
import PostContainer from '../../client/PostContainer.jsx';
import SettingsContainer from '../../client/SettingsContainer.jsx';

import HubContainer from '../../client/HubContainer.jsx';
import ProfileContainer from '../../client/ProfileContainer.jsx';

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
      content: (<HubContainer hubName={params.hubName} />),
    });
  },
});

FlowRouter.route('/settings', {
  action() {
    if (Meteor.userId()) {
      mount(MainLayout, {
        content: (<SettingsContainer userId={Meteor.userId()} />),
      });
    } else {
      FlowRouter.go('/login');
    }
  },
});

FlowRouter.route('/:profileName', {
  action(params) {
    mount(MainLayout, {
      content: (<ProfileContainer profileName={params.profileName} />),
    });
  },
});
