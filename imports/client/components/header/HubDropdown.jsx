import React from 'react';
import { Dropdown, Image} from 'semantic-ui-react';
import Hubs from '../../../api/hubs.js';

let hubOptions = Hubs.map(hubObject => ({
  key: hubObject.hubName,
  text: hubObject.hubName,
  value: hubObject.hubName,
  image: { src: hubObject.image },
  as: 'a',
  href: `/hub/${hubObject.hubName}`,
}));

hubOptions = [{
  key: 'All',
  text: 'All',
  value: 'All',
  as: 'a',
  href: '/' }, ...hubOptions];
const dropdownStyle = {
  width: '200px',
}
const HubDropdown = () => (
  <Dropdown item text="Hubs" icon="grid layout">
    <Dropdown.Menu style={dropdownStyle}>
      {Hubs.map(hubObject => (
        <Dropdown.Item key={hubObject.hubName} >
          <Image src={hubObject.image} size='small'/>
          {hubObject.hubName}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default HubDropdown;
