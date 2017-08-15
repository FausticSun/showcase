import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const ErrorPageContainer = {
  fontSize: '4em',
};

const ErrorPage = () => (
  <div style={ErrorPageContainer}>
    <Header icon>
      <Icon name="meh" circular />
      <Header.Content>
        Oops!
      </Header.Content>
      <Header.Subheader>
        Something went wrong! We're working to fix it! Click <a href="/">here</a> to go back home
      </Header.Subheader>
    </Header>
  </div>
);

export default ErrorPage;
