import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.divStyle = {
      left: this.props.number[0],
      top:  this.props.number[1]
    };
  }
  render () {
      return (
//          <div className="tag" style={this.divStyle}>{this.props.number[0]} + {this.props.number[1]}</div>
        <div className="tag" style={this.divStyle}>{this.props.number[2]}</div>
      );
  }
}
