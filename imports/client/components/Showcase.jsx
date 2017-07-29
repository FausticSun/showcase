import React, { Component, PropTypes } from 'react';
import { Card, Image } from 'semantic-ui-react';
import TagHolder from './TagHolder.jsx';

const showcaseStyle = {
  width: '600px',
  marginBottom: '20px',
};

class Showcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null,
    };
  }

  render() {
    return (
      <div style={showcaseStyle}>
        <Card fluid>
          <div style={{ position: 'relative' }}>
            <div onClick={this.clickHandler} >
              <Image fluid src={this.props.showcaseData.imageSrc} />
              <TagHolder tags={this.props.showcaseData.tags} />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

Showcase.propTypes = {
  showcaseData: PropTypes.shape({
    createdAt: PropTypes.date,
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })),
    hubName: PropTypes.string,
    imageSrc: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    userId: PropTypes.string,
  }).isRequired,
};

export default Showcase;
