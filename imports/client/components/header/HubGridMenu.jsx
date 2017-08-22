import React from 'react';
import { Dropdown, Grid, Image } from 'semantic-ui-react';

const gridItem = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100px',
  width: '100px',
  padding: '10px',
};

const gridItemText = {
  display: 'block',
  textAlign: 'center',
  marginTop: '5px',
  fontFamily: 'Cormorant Garamond',
  fontSize: '1.2em',
};

const HubDropdown = () => (
  <Dropdown item text="Hubs" icon="grid layout">
    <Dropdown.Menu>
      <Grid style={{ width: '400px' }}>
        <Grid.Row columns={1}>
          <Grid.Column>
            <a href="/">All Showcases</a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <div style={gridItem}>
              <Image src="/assets/img/mfa.png" size="mini" />
              <span style={gridItemText}>Male Fashion</span>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div style={gridItem}>
              <Image src="/assets/img/mfa.png" size="mini" />
              <span style={gridItemText}>Male Fashion</span>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div style={gridItem}>
              <Image src="/assets/img/mfa.png" size="mini" />
              <span style={gridItemText}>Male Fashion</span>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Dropdown.Menu>
  </Dropdown>
);

export default HubDropdown;
