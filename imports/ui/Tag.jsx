import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

// Task component - represents a single todo item
export default class Tag extends Component {
  constructor(props) {
    super(props);
    // Array is [ left %, top %, ChronologicalTagNumber, LabelDescription, LabelURL]
    this.divStyle = {
      left: this.props.objArray[0],
      top: this.props.objArray[1],
    };
    this.labelName = `label${this.props.objArray[2]}`;
  }

  render () {
    return (
      <div className="tag" style={this.divStyle} >
        <div className="singleTag">{this.props.objArray[2]}</div>
        <div className="label"><a className="labelUrl" href={this.props.objArray[4]}>{this.props.objArray[3]}</a></div>
      </div>
    );
  }
}
