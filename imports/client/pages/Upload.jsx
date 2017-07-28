import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Button } from 'semantic-ui-react';
import Images from '../../api/images.js';
import ImageTagger from '../components/imageTagging/ImageTagger.jsx';

const uploadStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      tags: [],
      hubName: '',
    };
  }

  imageUploadHandler = (e) => {
    this.setState({
      imageURL: window.URL.createObjectURL(e.target.files[0]),
    });
    this.setState({ tags: [] });
  };

  newTagHandler = (newTag) => {
    this.setState({ tags: [...this.state.tags, newTag] });
  };

  submitPostHandler = () => {
    const insertedData = {
      tags: this.state.tags,
      hubName: this.state.hubName,
    };
    Meteor.call('showcases.insert', insertedData, (e, postId) => {
      Images.insert({
        file: this.file.files[0],
        meta: { postId },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        onUploaded: () => {
          FlowRouter.go(`/p/${postId}`);
        },
      });
    });
  };

  render() {
    return (
      <div style={uploadStyle}>
        <input
          type="file"
          ref={r => (this.file = r)}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={this.imageUploadHandler}
        />
        <Button primary onClick={() => this.file.click()}>Upload Image</Button>
        { this.state.imageURL ?
          <div>
            <ImageTagger
              imageSrc={this.state.imageURL}
              newTagHandler={this.newTagHandler}
              tags={this.state.tags}
            />
            <Button primary onClick={this.submitPostHandler}>Submit post</Button>
          </div>
          : null }
      </div>
    );
  }
}

Upload.propTypes = {
  currentUser: PropTypes.string,
};

Upload.defaultProps = {
  currentUser: null,
};

export default createContainer(() => ({
  currentUser: Meteor.userId(),
}), Upload);
