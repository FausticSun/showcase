import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from '../components/header/SiteHeader.jsx';

import '../../startup/client/accounts-config.js';

export const MainLayout = ({ content }) => (
  <div className="main-layout">
    <SiteHeader />
    <div>
      {content}
    </div>
  </div>
);

MainLayout.propTypes = {
  content: PropTypes.element.isRequired,
};
