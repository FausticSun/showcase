import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Image, Card } from 'semantic-ui-react';
import TagHolder from '../TagHolder.jsx';
import TagInput from './TagInput.jsx';
import { TagSize } from '../Tag.jsx';

const imageTaggerStyle = {
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
    const rect = e.currentTarget.getBoundingClientRect();
    const percentX = `${(((e.clientX - rect.left) - (TagSize / 2)) / rect.width) * 100}%`;
    const percentY = `${(((e.clientY - rect.top) - (TagSize / 2)) / rect.height) * 100}%`;
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
        <Card fluid>
          <div style={{ position: 'relative' }}>
            <div onClick={this.clickHandler} >
              <Image fluid src={this.props.imageSrc} />
              <TagHolder tags={this.state.tags} />
            </div>
            { this.state.clickPos ?
              <TagInput clickPos={this.state.clickPos} newTagHandler={this.newTagHandler} /> : null
            }
          </div>
        </Card>
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
