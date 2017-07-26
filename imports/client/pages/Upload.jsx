import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'semantic-ui-react';
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
      imageURI: null,
      tags: [],
    };
  }

  handleImageUploaded = (e) => {
    this.setState({
      imageURI: window.URL.createObjectURL(e.target.files[0]),
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
          onChange={this.handleImageUploaded}
        />
        <Button primary onClick={() => this.file.click()}>Upload Image</Button>
        { this.state.imageURI ? <ImageTagger imageSrc={this.state.imageURI} /> : null }
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
