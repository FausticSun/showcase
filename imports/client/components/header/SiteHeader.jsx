import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import HubDropdown from './HubDropdown.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class SiteHeader extends Component {
    logout = () => {
      Meteor.logout();
      FlowRouter.go('/');
    }
    render() {
      if( this.props.currentUser ) {
        $menuView = ( <Dropdown item text={this.props.currentUser.username} >
                        <Dropdown.Menu>
                          <Dropdown.Item>My Profile</Dropdown.Item>
                          <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
        );
      } else {
        $menuView = (<Menu.Item name="login" href="/login"/>);
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

export default createContainer(() => ({
    currentUser: Meteor.user(),
}), SiteHeader);