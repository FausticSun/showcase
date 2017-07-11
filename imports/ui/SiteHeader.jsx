import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

export default class SiteHeader extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item header className="showcase-logo"> Showcase </Menu.Item>
        <Menu.Item name="Hubs" active={activeItem === 'home'} onClick={this.handleItemClick}>
          <Icon name="grid layout" size="large" /> Hubs
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="upload" active={activeItem === 'upload'} onClick={this.handleItemClick} />
          <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}
