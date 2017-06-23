import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Canvases } from '../api/canvases.js';
import Canvas from './Canvas.jsx';
import Tag from './Tag.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', x: 0, y: 0,tags : []};
  }

  _handleSubmit(e) {
    e.preventDefault();

    const imgData = this.state.imagePreviewUrl;
    const tags = this.state.tags;
    const height = document.getElementById("imgBox").naturalHeight;
    const width = document.getElementById("imgBox").naturalWidth;
    // Canvases.insert({
    //   imgData,
    //   createdAt: new Date(), // current time
    //   tags,
    //   width,
    //   height,
    //   owner: Meteor.userId(),           // _id of logged in user
    //   username: Meteor.user().username,
    // });
    Meteor.call('canvases.insert',[imgData, tags, width, height])
    console.log('handle uploading-', this.state.file);

    //Reroute to home
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
    reader.readAsDataURL(file);

  }
  _onImgClickTag(e) {
    let {imagePreviewUrl} = this.state;
    const position = ReactDOM.findDOMNode(this.refs.elem).getBoundingClientRect();
    //console.log(position, e.nativeEvent.offsetX, e.screenX, e.nativeEvent.offsetY, e.screenY,position.height, position.width);
    const a = {imagePreviewUrl};
    var b = this.state.tags;
    var xpercent = e.nativeEvent.offsetX/position.width * 100;
    var ypercent = e.nativeEvent.offsetY/position.height * 100;
    b.push([ xpercent + '%', ypercent + '%', b.length + 1]);
    this.setState({ x: xpercent, y: ypercent, tags: b });
    //console.log('URL: ', this.state.tags);
  }
  //Render tags in the tagHolder div
  renderTags() {
    return this.state.tags.map((index) => (
      <Tag key={index} number={index} />
    ));
  }
  _resize(){
    const imgheight = document.getElementById("imgBox").naturalHeight;
    const imgwidth = document.getElementById("imgBox").naturalWidth;
    const newheight = imgheight * 800/imgwidth;
    document.getElementById("tagWrapper").style.height = newheight + 'px';
  }
  render() {
    const { x, y } = this.state;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $uploadBox = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className='preview' id='imgBox' src={imagePreviewUrl} onLoad={(e)=>this._resize(e)}/>);
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
        <div className="tagholder" id='tagWrapper' onMouseDown={this._onImgClickTag.bind(this)}>
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
