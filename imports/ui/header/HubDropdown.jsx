import React, { Component } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';

export default class HubDropdown extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Dropdown item text="Hubs" icon="grid layout">
        <Dropdown.Menu>
          <Grid doubling columns={5}>
            <Grid.Row>
              <Grid.Column>
                <Dropdown.Item text="MFA" />
              </Grid.Column>
              <Grid.Column>
                <Dropdown.Item text="EDC" />
              </Grid.Column>
              <Grid.Column>
                <Dropdown.Item text="ABC" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
