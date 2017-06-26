import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Canvases } from '../api/canvases.js';
import Canvas from './Canvas.jsx';
import Tag from './Tag.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', x: 0, y: 0,tags : []};
    console.log('HI');
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    const text = this.state.imagePreviewUrl;
    const tags = this.state.tags;
    Canvases.insert({
      text,
      createdAt: new Date(), // current time
      tags,
    });
    console.log('handle uploading-', this.state.file);

    FlowRouter.go('/');
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  _onMouseMove(e) {
    let {imagePreviewUrl} = this.state;
    const position = ReactDOM.findDOMNode(this.refs.elem).getBoundingClientRect();
    console.log(position, e.nativeEvent.offsetX, e.screenX, e.nativeEvent.offsetY, e.screenY,position.height, position.width);
    const a = {imagePreviewUrl};
    var b = this.state.tags;
    var xpercent = e.nativeEvent.offsetX/position.width * 100;
    var ypercent = e.nativeEvent.offsetY/position.height * 100;
    b.push([ xpercent + '%', ypercent + '%']);
    this.setState({ x: xpercent, y: ypercent, tags: b });
    console.log('URL: ', this.state.tags);
  }
  renderTags() {
    return this.state.tags.map((index) => (
      <Tag key={index} number={index} />
    ));
  }
  render() {
    const { x, y } = this.state;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $uploadBox = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className='preview' src={imagePreviewUrl} />);
      $uploadBox = (<button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
    );
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      $uploadBox = (<input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />);
    }

    return (
      <div className="previewComponent">
        <form>
          {$uploadBox}
        </form>
        <div className="tagholder" onMouseDown={this._onMouseMove.bind(this)}>
          {this.renderTags()}
        </div>
        <div ref="elem" className="imgPreview">
          {$imagePreview}
        </div>
        <h1>Mouse coordinates: { x } { y }</h1>
      </div>
    )
  }
}
