import React, { Component } from 'react';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import HubDropdown from './HubDropdown.jsx';


class SiteHeader extends Component {

  logout = () => {
    Meteor.logout();
    FlowRouter.go('/');
  };
  goSettings = () => {
    FlowRouter.go('/settings');
  };
  render() {
    let $menuView = '';
    if (this.props.currentUser) {
      const imgStyle = {
        width: '25px',
        height: '25px',
        marginRight: '5px',
      };
      const trigger = (
        <span>
          <Image style={imgStyle} shape="circular" centered inline avatar src={this.props.currentUser.profile.profilePic} />
          {this.props.currentUser.profile.name}
        </span>
      );
      $menuView = (
        <Dropdown item trigger={trigger}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.goSettings}>My Profile</Dropdown.Item>
            <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      $menuView = (<Menu.Item name="login" href="/login" />);
    }
    return (
      <Menu style={{ marginTop: '0' }}>
        <Menu.Item header className="showcase-logo" href="/"> Showcase </Menu.Item>
        <HubDropdown />
        <Menu.Menu position="right">
          <Menu.Item name="upload" href="/upload">
            <Icon name='upload' /> Upload
          </Menu.Item>
          {$menuView}
        </Menu.Menu>
      </Menu>
    );
  }
}
SiteHeader.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      profilePic: PropTypes.string,
    }),
  }),
};

SiteHeader.defaultProps = {
  currentUser: null,
};
export default createContainer(() => ({
  currentUser: Meteor.user(),
}), SiteHeader);
