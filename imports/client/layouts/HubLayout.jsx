import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Divider } from 'semantic-ui-react';
import ShowcaseList from '../components/showcase/ShowcaseList.jsx';
import Hubs from '../../api/hubs.js';
import '../../startup/client/accounts-config.js';

const centeredContent = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

class HubLayout extends Component {
  render() {
    const name = this.props.hubName;
    const hubObj = Hubs.find(obj => obj.hubName === name);
    return (
      <div>
        <div style={centeredContent}>
          <Header as="h2" icon >
            {hubObj.hubName} <Image src={hubObj.image} />
            <Header.Subheader>
              {hubObj.fullName}
            </Header.Subheader>
          </Header>
        </div>
        <Divider />
        <div style={centeredContent}>
          <ShowcaseList hubName={this.props.hubName} />
        </div>
      </div>
    );
  }
}

HubLayout.propTypes = {
  hubName: PropTypes.string.isRequired,
};

export default HubLayout;
