import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from '../components/header/SiteHeader.jsx';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

import '../../startup/client/accounts-config.js';

export const MainLayout = ({ content }) => (
  <div className="main-layout">
    <SiteHeader />
    <header>
      <AccountsUIWrapper />
      <div >
        <a href="/" id="showcasehead">Showcase</a>
      </div>
      <a href="/upload">Upload</a>

      <div>
        <a href="/hub/EDC">EDC</a>
        |
        <a href="/hub/MFA">MFA</a>
        |
        <a href="/hub/flatlays">Flaylays</a>
      </div>

    </header>
    <div>
      {content}
    </div>
  </div>
);

MainLayout.propTypes = {
  content: PropTypes.element.isRequired,
};
