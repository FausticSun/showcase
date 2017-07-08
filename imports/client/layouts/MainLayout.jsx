import React from 'react';
import PropTypes from 'prop-types';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper.jsx';

import '../../startup/accounts-config.js';

export const MainLayout = ({ content }) => (
  <div className="main-layout">
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
