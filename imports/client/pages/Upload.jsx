import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Button, Form } from 'semantic-ui-react';
import Images from '../../api/images.js';
import { Showcase } from '../../api/showcases.js';
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
      title: '',
      description: '',
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

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
    const { tags, title, description, hubName } = this.state;
    const newShowcase = new Showcase();
    newShowcase.title = title;
    newShowcase.description = description;
    newShowcase.tags = tags;
    newShowcase.hubName = hubName;
    Images.insert({
      file: this.file.files[0],
      streams: 'dynamic',
      chunkSize: 'dynamic',
      onUploaded: (error, fileRef) => {
        newShowcase.imageSrc = Images.link(fileRef);
        newShowcase.insert(() => {
          FlowRouter.go('/');
        });
      },
    });
  };

  render() {
    const { title, description, hubName } = this.state;

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
            <Form onSubmit={this.submitPostHandler}>
              <Form.Input
                name="title"
                placeholder="Enter Title"
                value={title}
                onChange={this.handleChange}
              />
              <Form.TextArea
                name="description"
                placeholder="Enter a short description"
                value={description}
                onChange={this.handleChange}
              />
              <Form.Input
                name="hubName"
                placeholder="Enter name of hub to submit to"
                value={hubName}
                onChange={this.handleChange}
              />
              <Form.Button content="Submit post" />
            </Form>
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
