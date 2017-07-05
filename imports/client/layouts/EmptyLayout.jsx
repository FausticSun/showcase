import React, { Component } from 'react';

class EmptyLayout extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Showcase</h1>
        </header>
        {this.props.children}
      </div>
    );
  }
}
export default EmptyLayout;
