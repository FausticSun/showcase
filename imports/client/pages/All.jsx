import React from 'react';
import { Header, Divider, Image } from 'semantic-ui-react';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';

const hubStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const All = () => (
  <div>
    <Header as="h2" style={hubStyle}>
      <Image src="/assets/img/earth-globe.png" />
      All
      <Header.Subheader>
        All of the Showcases from every hub
      </Header.Subheader>
    </Header>
    <Divider section />
    <ShowcaseList />
  </div>
);

export default All;
