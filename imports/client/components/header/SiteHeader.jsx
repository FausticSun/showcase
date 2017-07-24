import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import HubDropdown from './HubDropdown.jsx';

export default class SiteHeader extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item header className="showcase-logo" href="/"> Showcase </Menu.Item>
        <HubDropdown />
        <Menu.Menu position="right">
          <Menu.Item name="upload" active={activeItem === 'upload'} onClick={this.handleItemClick} href="/upload" />
          <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}
