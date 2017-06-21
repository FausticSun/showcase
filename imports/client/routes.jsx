import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {MainLayout} from './layouts/MainLayout.jsx';
import App from '../ui/App.jsx';
import Upload from '../ui/Upload.jsx';
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
