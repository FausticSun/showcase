import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Button, Form } from 'semantic-ui-react';
import Images from '../../api/images.js';
import { Showcase } from '../../api/showcases.js';
import ImageTagger from '../components/imageTagging/ImageTagger.jsx';
import Hubs from '../../api/hubs.js';

const dropdownOptions = Hubs.map(hubObject => ({
  key: hubObject.hubName,
  text: hubObject.hubName,
  value: hubObject.hubName,
}));
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: props.image,
      imageURL: props.image ? window.URL.createObjectURL(props.image) : null,
      tags: [],
      hubName: '',
      title: '',
      description: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image) {
      this.setState({
        imageFile: nextProps.image,
        imageURL: window.URL.createObjectURL(nextProps.image),
      });
    }
  }

  componentWillUnmount() {
    this.props.clearImage();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  imageUploadHandler = (e) => {
    this.setState({
      imageFile: e.target.files[0],
      imageURL: window.URL.createObjectURL(e.target.files[0]),
      clickedSubmit: false,
    });
    this.setState({ tags: [] });
  };

  newTagHandler = (newTag) => {
    this.setState({ tags: [...this.state.tags, newTag] });
  };

  submitPostHandler = () => {
    this.setState({ clickedSubmit: true });
    const { tags, title, description, hubName } = this.state;
    const newShowcase = new Showcase();
    newShowcase.title = title;
    newShowcase.description = description;
    newShowcase.tags = tags;
    newShowcase.hubName = hubName;
    Images.insert({
      file: this.state.imageFile,
      streams: 'dynamic',
      chunkSize: 'dynamic',
      onUploaded: (err, fileRef) => {
        newShowcase.imageSrc = Images.link(fileRef);
        newShowcase.insert((error) => {
          if (error) {
            FlowRouter.go('/error');
          } else {
            FlowRouter.go('/');
          }
        });
      },
    });
  };

  render() {
    const { title, description } = this.state;

    return (
      <div>
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
              <Form.Select
                name="hubName"
                placeholder="Enter name of hub to submit to"
                options={dropdownOptions}
                onChange={this.handleChange}
              />
              {this.state.clickedSubmit ?
                <Form.Button disabled content="Uploading post" />
                :
                <Form.Button content="Upload post" />
              }
            </Form>
          </div>
          : null }
      </div>
    );
  }
}

Upload.propTypes = {
  image: PropTypes.instanceOf(File),
  clearImage: PropTypes.func,
};

Upload.defaultProps = {
  image: null,
  clearImage: null,
};

export default Upload;
