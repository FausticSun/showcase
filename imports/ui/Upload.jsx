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
  /*Hierachy of elements:
    tempTagHolder (visibility toggled by whether there is a temporary tag clicked)
    tagholder
    image
  */
  existsTempTag(){
    return (this.state.tempTag.length > 0);
  }
  _handleClickToUpload(e) {
    e.preventDefault();

    const imgData = this.state.imagePreviewUrl;
    const tags = this.state.tags;
    const height = document.getElementById("imgBox").naturalHeight;
    const width = document.getElementById("imgBox").naturalWidth;

    //Using API to insert as Array of Objects
    Meteor.call('canvases.insert',[imgData, tags, width, height])

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
  //Clicking on the tagHolder
  _onClickToTagImg(e) {
    //Get relative left and top percentages, applying to element style later
    const position = ReactDOM.findDOMNode(this.refs.elem).getBoundingClientRect();
    var xpercent = e.nativeEvent.offsetX/position.width * 100;
    var ypercent = e.nativeEvent.offsetY/position.height * 100;
    this._makeTempTagHolderVisible();
    //Push to State, where renderTempTag will render the temporary tag
    this.setState({tempTag: [ xpercent + '%', ypercent + '%']});
  }
  _onSubmitLabel(e) { //When user enters both Description and URL of tag and press enter
    e.preventDefault();
    var tagArray = this.state.tags;
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const url = ReactDOM.findDOMNode(this.refs.urlInput).value.trim();
    var xpercent = this.state.tempTag[0];
    var ypercent = this.state.tempTag[1];
    tagArray.push([ xpercent, ypercent, tagArray.length + 1, text, url]);
    this.setState({ x: xpercent, y: ypercent, tags: tagArray, tempTag:[] });
    this._makeTempTagHolderHidden();
    return false;
  }
  _cancelTemp(){
    this.setState({tempTag: []});
    this._makeTempTagHolderHidden();
  }
  _resize(){
    const imgheight = document.getElementById("imgBox").naturalHeight;
    const imgwidth = document.getElementById("imgBox").naturalWidth;
    const newheight = imgheight * 800/imgwidth;
    document.getElementById("tagWrapper").style.height = newheight + 'px';
    document.getElementById("tempTagHolder").style.height = newheight + 'px';

  }

  _makeTempTagHolderVisible(){
    const imgheight = document.getElementById("imgBox").naturalHeight;
    const imgwidth = document.getElementById("imgBox").naturalWidth;
    const newheight = imgheight * 800/imgwidth;
    document.getElementById("tempTagHolder").style.visibility = 'visible';
  }

  _makeTempTagHolderHidden(){
    document.getElementById("tempTagHolder").style.visibility = 'hidden';
  }

  //RENDERING COMPONENTS ON SCREEN
  renderTags() { //RENDERING THE SUBMITTED TAGS
    return this.state.tags.map((index) => (
      <Tag key={index} objArray={index} />
    ));
  }
  renderTempTag(){ //RENDERING THE SINGLE TEMPORARY TAGS
    let xposition = this.state.tempTag[0];
    let yposition = this.state.tempTag[1];
    let xyposition = {left: xposition, top: yposition};
    if(this.existsTempTag()){
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

  render() { //MAIN RENDER
    const { x, y } = this.state;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $uploadBox = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className='preview' id='imgBox' src={imagePreviewUrl} onLoad={(e)=>this._resize(e)}/>);
      $uploadBox = (<button className="submitButton" type="submit" onClick={(e)=>this._handleClickToUpload(e)}>Upload Image</button>
    );
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      $uploadBox = (<input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />);
    }
    let $tagPreview = '';
    if(this.existsTempTag()){ //A temporary tag is clicked
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
            <button className="cancelTempTagButton" onClick={this._cancelTemp.bind(this)}>
              Cancel &times;
            </button>
          </div>
          <div className="tagholder" id='tagWrapper' onMouseDown={this._onClickToTagImg.bind(this)}>
            {this.renderTags()}
          </div>
          <div ref="elem" className="imgPreview">
            {$imagePreview}
          </div>
        </div>
        :
        //Not signed in
        <div className='previewComponent'>PLEASE SIGN IN</div> }
      </div>
    )
  }
}
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Upload);
