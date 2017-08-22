import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const FourOhFourContainer = {
  fontSize: '4em',
};

const FourOhFour = () => (
  <div style={FourOhFourContainer}>
    <Header icon>
      <Icon name="warning" circular />
      <Header.Content>
        404
      </Header.Content>
      <Header.Subheader>
        Not Found
      </Header.Subheader>
    </Header>
  </div>
);

export default FourOhFour;
