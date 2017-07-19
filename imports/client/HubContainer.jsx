/* global HubContainer:true */
/* exported HubContainer */

import { createContainer } from 'meteor/react-meteor-data';
import { Canvases } from '../api/canvases.js';
import Hub from './Hub.jsx';

export default HubContainer = createContainer(({ hubName }) => {
  const canvases = Canvases.find(
    { hubName },
    { sort: { createdAt: -1 } },
  ).fetch();
  const hub = hubName;
  return {
    canvases,
    hub,
  };
}, Hub);
