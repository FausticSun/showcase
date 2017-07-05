import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MainLayout } from './layouts/MainLayout.jsx';
import App from '../ui/App.jsx';
import Upload from '../ui/Upload.jsx';
import PostContainer from '../ui/PostContainer.jsx';
<<<<<<< HEAD
import Hub from '../ui/Hub.jsx';
import Login from '../ui/Login.jsx';
=======
>>>>>>> 36d3706cc0026c147f271c3e8f23516acc92a02c
import HubContainer from '../ui/HubContainer.jsx';

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
<<<<<<< HEAD
        content: (<HubContainer hubName={params.hubName}/>)
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
=======
      content: (<HubContainer hubName={params.hubName} />),
    });
  },
>>>>>>> 36d3706cc0026c147f271c3e8f23516acc92a02c
});
