import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Canvases } from '../api/canvases.js';
import Hub from './Hub.jsx';
import Canvas from './Canvas.jsx';

export default HubContainer = createContainer(({ hubName }) => {
  const canvases = Canvases.find(
    {"hubName" : hubName },
    { sort: { createdAt: -1 } }
  ).fetch();
  const hub = hubName;
  return {
    canvases,
    hub
  };
}, Hub);
