import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Image, Card } from 'semantic-ui-react';

const cardStyle = {
  width: '600px',
};

class ImageTagger extends Component {
  tags = [];

  render() {
    return (
      <Card style={cardStyle}>
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
