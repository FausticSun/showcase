import React from 'react';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';

const homeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

const Home = () => (
  <div style={homeStyle}>
    <ShowcaseList />
  </div>
);

export default Home;
