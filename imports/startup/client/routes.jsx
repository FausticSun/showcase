import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import MainLayout from '../../client/layouts/MainLayout.jsx';
import Home from '../../client/pages/Home.jsx';
import Hub from '../../client/pages/Hub.jsx';
import Upload from '../../client/pages/Upload.jsx';
import Post from '../../client/pages/Post.jsx';
import Settings from '../../client/pages/Settings.jsx';
import FourOhFour from '../../client/pages/FourOhFour.jsx';
import LoginAndRegister from '../../client/pages/LoginAndRegister.jsx';
import ErrorPage from '../../client/pages/ErrorPage.jsx';

const isLoggedIn = () => {
  if (!(Meteor.loggingIn() || Meteor.userId())) {
    FlowRouter.go('/login');
  }
};

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Home />),
    });
  },
});

FlowRouter.route('/404', {
  action() {
    mount(MainLayout, {
      content: (<FourOhFour />),
    });
  },
});

FlowRouter.route('/error', {
  action() {
    mount(MainLayout, {
      content: (<ErrorPage />),
    });
  },
});

FlowRouter.route('/upload', {
  triggersEnter: [isLoggedIn],
  action(params, queryParams) {
    console.log(queryParams);
    mount(MainLayout, {
      content: (<Upload image={queryParams.image} />),
    });
  },
});

FlowRouter.route('/login', {
  action() {
    mount(MainLayout, {
      content: (<LoginAndRegister />),
    });
  },
});

FlowRouter.route('/p/:postId', {
  action(params) {
    mount(MainLayout, {
      content: (<Post id={params.postId} />),
    });
  },
});

FlowRouter.route('/hub/:hubName', {
  action(params) {
    mount(MainLayout, {
      content: (<Hub hubName={params.hubName} />),
    });
  },
});

FlowRouter.route('/settings', {
  triggersEnter: [isLoggedIn],
  action() {
    mount(MainLayout, {
      content: (<Settings />),
    });
  },
});

FlowRouter.route('/:profileName', {
  action(params) {
    mount(MainLayout, {
      content: (<Profile profileName={params.profileName} />),
    });
  },
});

FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: (<FourOhFour />),
    });
  },
};
