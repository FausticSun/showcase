import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from '../components/header/SiteHeader.jsx';

import '../../startup/client/accounts-config.js';

const centeredContent = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const MainLayout = ({ content }) => (
  <div className="main-layout">
    <SiteHeader />
    <div style={centeredContent}>
      {content}
    </div>
  </div>
);

MainLayout.propTypes = {
  content: PropTypes.element.isRequired,
};
