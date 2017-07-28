import React from 'react';
import { Menu } from 'semantic-ui-react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import HubDropdown from './HubDropdown.jsx';

const SiteHeader = () => (
  <Menu>
    <Menu.Item header className="showcase-logo" href="/"> Showcase </Menu.Item>
    <HubDropdown />
    <Menu.Menu position="right">
      <Menu.Item name="upload" href="/upload" />
      <Menu.Item name="login" href="/login" />
    </Menu.Menu>
  </Menu>
);

export default SiteHeader;
