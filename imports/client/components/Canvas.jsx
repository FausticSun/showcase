import React, { Component, PropTypes } from 'react';
import { Card, Image } from 'semantic-ui-react';
import TagHolder from './TagHolder.jsx';

const canvasStyle = {
  width: '600px',
};

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null,
    };
  }

  render() {
    return (
      <div style={canvasStyle}>
        <Card fluid>
          <div style={{ position: 'relative' }}>
            <div onClick={this.clickHandler} >
              <Image fluid src={this.props.imageSrc} />
              <TagHolder tags={this.props.canvasData.tags} />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

Canvas.propTypes = {
  canvasData: PropTypes.shape({
    createdAt: PropTypes.date,
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })),
    likes: PropTypes.arrayOf(PropTypes.string),
    hubName: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default Canvas;
