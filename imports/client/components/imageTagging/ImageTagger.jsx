import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Image, Card } from 'semantic-ui-react';
import TagHolder from '../TagHolder.jsx';
import TagInput from './TagInput.jsx';

const imageTaggerStyle = {
  position: 'relative',
  width: '600px',
};

class ImageTagger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickPos: null,
      tags: [],
    };
  }

  newTagHandler = (newTag) => {
    this.setState({ tags: [...this.state.tags, newTag] });
    this.setState({ clickPos: null });
  };

  clickHandler = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percentX = `${(e.nativeEvent.offsetX / rect.width) * 100}%`;
    const percentY = `${(e.nativeEvent.offsetY / rect.height) * 100}%`;
    this.setState({
      clickPos: {
        left: percentX,
        top: percentY,
      },
    });
  };

  render() {
    return (
      <div style={imageTaggerStyle}>
        <Card fluid onMouseDown={this.clickHandler}>
          <TagHolder tags={this.state.tags} />
          <Image fluid src={this.props.imageSrc} />
        </Card>
        { this.state.clickPos ?
          <TagInput clickPos={this.state.clickPos} newTagHandler={this.newTagHandler} /> : null
        }
      </div>
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
