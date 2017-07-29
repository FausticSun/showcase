import React from 'react';
import { PropTypes } from 'prop-types';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';

const hubStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

const Hub = props => (
  <div style={hubStyle}>
    <ShowcaseList hubName={props.hubName} />
  </div>
);

Hub.propTypes = {
  hubName: PropTypes.string.isRequired,
};

export default Hub;
