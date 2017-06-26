import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Canvases } from '../api/canvases.js';
import Canvas from './Canvas.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', x: 0, y: 0,tags : [] };
    console.log('HI');
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    const text = this.state.imagePreviewUrl;
    Canvases.insert({
      text,
      createdAt: new Date(), // current time
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
    console.log(position, e.nativeEvent.offsetX, e.screenX, e.nativeEvent.offsetY, e.screenY);
    const a = {imagePreviewUrl};
    var b = this.state.tags;
    b.push([ e.nativeEvent.offsetX, e.nativeEvent.offsetY ]);
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, tags: b });
    console.log('URL: ', this.state.tags);
  }

  render() {
    const { x, y } = this.state;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $uploadBox = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img onMouseDown={this._onMouseMove.bind(this)} className='preview' src={imagePreviewUrl} />);
      $uploadBox = (<button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
    );
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      $uploadBox = (<input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />);
    }

    return (
      <div className="previewComponent">
        <div ref="elem" className="imgPreview">
          {$imagePreview}
        </div>
        <form>
          {$uploadBox}
        </form>
        <h1>Mouse coordinates: { x } { y }</h1>
      </div>
    )
  }
}
