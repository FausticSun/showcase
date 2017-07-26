import React, { Component, PropTypes } from 'react';
import Canvas from './Canvas.jsx';

// App component - represents the whole app
export default class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(`profileName: ${this.props.profile}`);
  }
  renderCanvas() {
    return this.props.canvases.map(canvas => (
      <Canvas key={canvas._id} canvas={canvas} />
    ));
  }

  render() {
    return (
      <div className="container">
        <div>
          {this.renderCanvas()}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.string.isRequired,
  canvases: PropTypes.arrayOf(PropTypes.object).isRequired,
};