import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

// Task component - represents a single todo item
export default class Label extends Component {
  constructor(props) {
    super(props);
    //Array is [ left %, top %, ChronologicaltAGNumber, LabelDescription, LabelURL]
    this.labelName = 'labelText' + this.props.objArray[2];
  }

  render () {
      return (
        <ul className='singleLabelWrapper'>
          <span>{this.props.objArray[2]}</span>
          <a className='labelTextUrl' href={this.props.objArray[4]}>
            {this.props.objArray[3]} - {this.props.objArray[4]}
          </a>
        </ul>
      );
  }
}
