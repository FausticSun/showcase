import React, { Component, PropTypes } from 'react';
import Canvas from './Canvas.jsx';
// App component - represents the whole app
export default class Post extends Component {
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

Post.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.object).isRequired,
};
