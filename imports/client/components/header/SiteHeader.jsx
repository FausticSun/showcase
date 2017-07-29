import React, { Component } from 'react';
import { Menu, Dropdown, Image, Header} from 'semantic-ui-react';
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
      const imgStyle= {
        width: '25px',
        height: '25px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight : '5px',
      };
      const trigger = (
          <span>
            <Image style={imgStyle} shape="circular" src="https://qph.ec.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013-c" />
            {this.props.currentUser.username}
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
      <Menu>
        <Menu.Item header className="showcase-logo" href="/"> Showcase </Menu.Item>
        <HubDropdown />
        <Menu.Menu position="right">
          <Menu.Item name="upload" href="/upload" />
          {$menuView}
        </Menu.Menu>
      </Menu>
    );
  }
}
SiteHeader.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

SiteHeader.defaultProps = {
  currentUser: null,
};
export default createContainer(() => ({
  currentUser: Meteor.user(),
}), SiteHeader);
