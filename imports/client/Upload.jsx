import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Tag from './Tag.jsx';
import ImageTagger from "./components/imageTagging/ImageTagger";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '', x: 0, y: 0, tags: [], tempTag: [] };
  }
  /* Hierachy of elements:
    tempTagHolder (visibility toggled by whether there is a temporary tag clicked)
    tagholder
    image
  */

  // Clicking on the tagHolder
  onClickToTagImg = (e) => {
    // Get relative left and top percentages, applying to element style later
    const position = this.elem.getBoundingClientRect();
    const xpercent = (e.nativeEvent.offsetX / position.width) * 100;
    const ypercent = (e.nativeEvent.offsetY / position.height) * 100;
    this.makeTempTagHolderVisible();
    // Push to State, where renderTempTag will render the temporary tag
    this.setState({ tempTag: [`${xpercent}%`, `${ypercent}%`] });
  }

  onSubmitLabel = (e) => { // When user enters both Description and URL of tag and press enter
    e.preventDefault();
    const tagArray = this.state.tags;
    const text = this.textInput.value.trim();
    const url = this.urlInput.value.trim();
    const xpercent = this.state.tempTag[0];
    const ypercent = this.state.tempTag[1];
    tagArray.push([xpercent, ypercent, tagArray.length + 1, text, url]);
    this.setState({ x: xpercent, y: ypercent, tags: tagArray, tempTag: [] });
    this.makeTempTagHolderHidden();
    return false;
  }

  handleClickToUpload(e) {
    e.preventDefault();

    const imgData = this.state.imagePreviewUrl;
    const tags = this.state.tags;
    const height = document.getElementById('imgBox').naturalHeight;
    const width = document.getElementById('imgBox').naturalWidth;
    const hubName = this.hubInput.value.trim();

    // Using API to insert as Array of Objects
    Meteor.call('canvases.insert', {
      imgData,
      tags,
      width,
      height,
      hubName,
    });

    // Reroute to home
    FlowRouter.go('/');
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  existsTempTag() {
    return (this.state.tempTag.length > 0);
  }

  cancelTemp = () => {
    this.setState({ tempTag: [] });
    this.makeTempTagHolderHidden();
  }

  resize = () => {
    const imgheight = document.getElementById('imgBox').naturalHeight;
    const imgwidth = document.getElementById('imgBox').naturalWidth;
    const newheight = (imgheight * 800) / imgwidth;
    document.getElementById('tagWrapper').style.height = `${newheight}px`;
    document.getElementById('tempTagHolder').style.height = `${newheight}px`;
  }

  makeTempTagHolderVisible = () => {
    document.getElementById('tempTagHolder').style.visibility = 'visible';
  }

  makeTempTagHolderHidden = () => {
    document.getElementById('tempTagHolder').style.visibility = 'hidden';
  }

  // RENDERING COMPONENTS ON SCREEN
  renderTags() { // RENDERING THE SUBMITTED TAGS
    return this.state.tags.map(index => (
      <Tag key={index} objArray={index} />
    ));
  }
  renderTempTag = () => { // RENDERING THE SINGLE TEMPORARY TAGS
    const xposition = this.state.tempTag[0];
    const yposition = this.state.tempTag[1];
    const xyposition = { left: xposition, top: yposition };
    if (this.existsTempTag()) {
      return (
        <div className="tag" style={xyposition} >
          <div className="singleTag">{this.state.tags.length + 1}</div>
          <form >
            <input
              ref={textInput => (this.textInput = textInput)}
              placeholder="Description"
            />
          </form>
          <form onSubmit={this.onSubmitLabel}>
            <input
              ref={urlInput => (this.urlInput = urlInput)}
              placeholder="url"
            />
          </form>
        </div>
      );
    }
    return <div>Nothing?</div>;
  }

  render() { // MAIN RENDER
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    let $uploadBox = null;
    if (imagePreviewUrl) {
      $imagePreview = (<ImageTagger imageSrc={imagePreviewUrl} />);
      $uploadBox = (<button className="submitButton" type="submit" onClick={e => this.handleClickToUpload(e)}>Upload Image</button>
    );
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      $uploadBox = (<input className="fileInput" type="file" onChange={e => this.handleImageChange(e)} />);
    }
    let $tagPreview = '';
    if (this.existsTempTag()) { // A temporary tag is clicked
      $tagPreview = this.renderTempTag();
    } else {
      $tagPreview = '';
    }
    return (
      <div className="uploadWrapper">
        { this.props.currentUser ?
          <div className="previewComponent">
            <form>
              <input
                ref={hubInput => (this.hubInput = hubInput)}
                placeholder="Hub"
              />
              {$uploadBox}
            </form>
            <div id="tempTagHolder" className="tagholder">
              {$tagPreview}
              <button className="cancelTempTagButton" onClick={this.cancelTemp}>
              Cancel &times;
            </button>
            </div>
            <div className="tagholder" id="tagWrapper" onMouseDown={this.onClickToTagImg}>
              {this.renderTags()}
            </div>
            <div ref={elem => (this.elem = elem)} className="imgPreview">
              {$imagePreview}
            </div>
          </div>
        :
        // Not signed in
          <div className="previewComponent">PLEASE SIGN IN</div> }
      </div>
    );
  }
}

Upload.propTypes = {
  currentUser: PropTypes.shape({}),
};

Upload.defaultProps = {
  currentUser: null,
};

export default createContainer(() => ({
  currentUser: Meteor.user(),
}), Upload);
