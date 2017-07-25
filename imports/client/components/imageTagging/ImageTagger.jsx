import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Image, Card } from 'semantic-ui-react';
import TagHolder from '../TagHolder';

const cardStyle = {
  width: '600px',
};

class ImageTagger extends Component {
  tags = [];

  render() {
    return (
      <Card style={cardStyle}>
        <TagHolder tags={this.tags} />
        <Image fluid src={this.props.imageSrc} />
      </Card>
    );
  }
}

ImageTagger.propTypes = {
  imageSrc: PropTypes.string.isRequired,
};

ImageTagger.defaultProps = {
  imageSrc: '',
};

export default ImageTagger;
