import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

// Task component - represents a single todo item
export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.divStyle = {
      left: this.props.number[0],
      top:  this.props.number[1]
    };
    this.labelName = 'label' + this.props.number[2];
  }

  render () {
      return (
        <div className='tag' style={this.divStyle} >
          <div className="singleTag">{this.props.number[2]}</div>
          <div className="label"><a className='labelUrl' href={this.props.number[4]}>{this.props.number[3]}</a></div>
        </div>
      );
  }
}
