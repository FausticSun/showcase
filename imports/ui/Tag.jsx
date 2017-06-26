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
    this.focus = this.focus.bind(this);
  }
  focus() {
    // Explicitly focus the text input using the raw DOM API
    document.getElementById(this.labelname).focus();
  }
  focus2() {
    let a = this.labelname;
    document.getElementById(a).focus();
  }
  render () {
      return (
        <div className='tag' style={this.divStyle} >
          <div className="singleTag">{this.props.number[2]}</div>
          <input
            id={this.labelName}
            ref="textInput"
            type="text"
            onLoad={this.focus2()}
            onClick={this.focus}></input>
        </div>
      );
  }
}
