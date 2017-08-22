import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Dimmer, Header, Icon } from 'semantic-ui-react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import SiteHeader from '../components/header/SiteHeader.jsx';

import '../../startup/client/accounts-config.js';

const centeredContent = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimmerActive: false,
      image: null,
    };
  }

  onDragEnter = () => {
    this.setState({ dimmerActive: true });
  };

  onDragLeave = () => {
    this.setState({ dimmerActive: false });
  };

  onDrop = (files) => {
    this.setState({
      dimmerActive: false,
      image: files[0],
    });
    FlowRouter.go('/upload');
  };

  clearImageHandler = () => {
    this.setState({ image: null });
  };

  render() {
    return (
      <Dimmer.Dimmable
        as={Dropzone}
        accept="image/*"
        disableClick
        style={{ minHeight: '100vh' }}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        <Dimmer active={this.state.dimmerActive} style={{ position: 'fixed', height: '100vh', width: '100vw' }}>
          <Header as="h1" inverted icon>
            <Icon name="edit" />
            Drop to create a new showcase!
          </Header>
        </Dimmer>
        <SiteHeader />
        <div style={centeredContent}>
          {React.cloneElement(this.props.content,
            { image: this.state.image,
              clearImage: this.clearImageHandler,
            })
          }
        </div>
      </Dimmer.Dimmable>
    );
  }
}

MainLayout.propTypes = {
  content: PropTypes.element.isRequired,
};

export default MainLayout;
