import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Canvases } from '../api/canvases.js';
import Canvas from './Canvas.jsx';
import Tag from './Tag.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', x: 0, y: 0,tags : [], tempTag: []};
  }

  _handleSubmit(e) {
    e.preventDefault();

    const imgData = this.state.imagePreviewUrl;
    const tags = this.state.tags;
    const height = document.getElementById("imgBox").naturalHeight;
    const width = document.getElementById("imgBox").naturalWidth;

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
  _onImgClickToTag(e) {
    const position = ReactDOM.findDOMNode(this.refs.elem).getBoundingClientRect();
    //console.log(position, e.nativeEvent.offsetX, e.screenX, e.nativeEvent.offsetY, e.screenY,position.height, position.width);
    var xpercent = e.nativeEvent.offsetX/position.width * 100;
    var ypercent = e.nativeEvent.offsetY/position.height * 100;
    this._resizeTempHolder();
    this.setState({tempTag: [ xpercent + '%', ypercent + '%']});
    //console.log('URL: ', this.state.tags);
  }
  _onSubmitLabel(e) {
    e.preventDefault();
    var b = this.state.tags;
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const url = ReactDOM.findDOMNode(this.refs.urlInput).value.trim();
    var xpercent = this.state.tempTag[0];
    var ypercent = this.state.tempTag[1];
    b.push([ xpercent, ypercent, b.length + 1, text, url]);
    this.setState({ x: xpercent, y: ypercent, tags: b, tempTag:[] });
    //console.log('URL: ', this.state.tags);
    this.shrinkTempHolder();
    return false;
  }
  renderTags() {
    return this.state.tags.map((index) => (
      <Tag onLoad={this.appendLabel} key={index} number={index} />
    ));
  }
  renderTempTag(){
    let xposition = this.state.tempTag[0];
    let yposition = this.state.tempTag[1];
    let xyposition = {left: xposition, top: yposition};
    console.log('EYCB:' + this.state.tempTag.length);
    if(this.state.tempTag.length > 0){
      return (
        <div className='tag' style={xyposition} >
          <div className="singleTag">{this.state.tags.length + 1}</div>
          <form >
            <input
              ref="textInput"
              placeholder="Description"
            />
          </form>
          <form onSubmit={this._onSubmitLabel.bind(this)}>
            <input
              ref="urlInput"
              placeholder="url"
            />
          </form>
        </div>
      );
    }
  }
  cancelTemp(){
    this.setState({tempTag: []});
    this.shrinkTempHolder();
  }
  _resize(){
    const imgheight = document.getElementById("imgBox").naturalHeight;
    const imgwidth = document.getElementById("imgBox").naturalWidth;
    const newheight = imgheight * 800/imgwidth;
    document.getElementById("tagWrapper").style.height = newheight + 'px';
    document.getElementById("tempTagHolder").style.height = newheight + 'px';

  }

  _resizeTempHolder(){
    const imgheight = document.getElementById("imgBox").naturalHeight;
    const imgwidth = document.getElementById("imgBox").naturalWidth;
    const newheight = imgheight * 800/imgwidth;
    console.log('Resizing the div');
    document.getElementById("tempTagHolder").style.visibility = 'visible';
  }

  shrinkTempHolder(){
    document.getElementById("tempTagHolder").style.visibility = 'hidden';
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
    let $tagPreview = '';
    if(this.state.tempTag.length > 0){ //A temporary tag is clicked
      $tagPreview = this.renderTempTag();
    } else{
      $tagPreview = '';
    }
    return (
      <div className='uploadWrapper'>
        { this.props.currentUser ?
        <div className="previewComponent">
          <form>
            {$uploadBox}
          </form>
          <div id="tempTagHolder" className="tagholder">
            {$tagPreview}
            <button className="cancelTempTagButton" onClick={this.cancelTemp.bind(this)}>
              Cancel &times;
            </button>
          </div>
          <div className="tagholder" id='tagWrapper' onMouseDown={this._onImgClickToTag.bind(this)}>
            {this.renderTags()}
          </div>
          <div ref="elem" className="imgPreview">
            {$imagePreview}
          </div>
          <h1>Mouse coordinates: { x } { y }</h1>
        </div>
        :
        <div className='postWrapper'>PLEASE SIGN IN</div> }
      </div>
    )
  }
}

class Label extends React.Component {
  render() {
    return (
      <div>LOL FUCK</div>
    )
  }
}
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Upload);
