import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

import '../../startup/accounts-config.js';

export const MainLayout = ({content}) => (
  <div className='main-layout'>
    <header>
      <AccountsUIWrapper />
      <div >
        <a href='/' id='showcasehead'>Showcase</a>
      </div>

      <a href="/upload">>Upload</a>

    </header>
    <div>
      {content}
    </div>
  </div>
)
