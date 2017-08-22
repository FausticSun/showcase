import React from 'react';
import { Header, Image, Divider } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';
import Hubs from '../../api/hubs.js';

const hubStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const Hub = (props) => {
  const hubObj = Hubs.find(obj => obj.hubName === props.hubName);
  return (
    <div>
      <Header as="h2" style={hubStyle}>
        <Image src={hubObj.image} />
        {` ${hubObj.hubName}`}
        <Header.Subheader>
          {hubObj.fullName}
        </Header.Subheader>
      </Header>
      <Divider section />
      <ShowcaseList hubName={props.hubName} />
    </div>
  );
};

Hub.propTypes = {
  hubName: PropTypes.string.isRequired,
};

export default Hub;
