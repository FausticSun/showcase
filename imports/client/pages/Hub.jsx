import React from 'react';
import { PropTypes } from 'prop-types';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';

const Hub = props => (
  <div>
    <ShowcaseList hubName={props.hubName} />
  </div>
);

Hub.propTypes = {
  hubName: PropTypes.string.isRequired,
};

export default Hub;
