import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import Hubs from '../../../api/hubs.js';

const allOption = (
  <Dropdown.Item as="a" href={'/'}>
    <Image src='/assets/img/earth-globe.png' inline size='mini' />
    All
  </Dropdown.Item>);
const hubOptions = Hubs.map(hubObject => (
  <Dropdown.Item key={hubObject.hubName} as="a" href={`/hub/${hubObject.hubName}`}>
    <Image src={hubObject.image} inline size='mini' />
    {hubObject.hubName}
  </Dropdown.Item>));
const dropdownStyle = {
  width: '200px',
};
const HubDropdown = () => (
  <Dropdown item text="Hubs" icon="grid layout">
    <Dropdown.Menu style={dropdownStyle}>
      {allOption}
      {hubOptions}
    </Dropdown.Menu>
  </Dropdown>
);

export default HubDropdown;
