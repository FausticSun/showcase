import React from 'react';
import { Dropdown, } from 'semantic-ui-react';
import Hubs from '../../../api/hubs.js';

let hubOptions = Hubs.map(hubName => ({
  key: hubName,
  text: hubName,
  value: hubName,
  as: 'a',
  href: `/hub/${hubName}`,
}));

hubOptions = [{
  key: 'All',
  text: 'All',
  value: 'All',
  as: 'a',
  href: '/' }, ...hubOptions];

const HubDropdown = () => (
  <Dropdown item text="Hubs" icon="grid layout" options={hubOptions} />
);

export default HubDropdown;
