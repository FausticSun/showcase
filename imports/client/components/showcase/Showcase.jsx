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
    const showcaseData = this.props.showcaseData;
    return (
      <div style={showcaseStyle}>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {showcaseData.title}
            </Card.Header>
          </Card.Content>
          <div style={{ position: 'relative' }}>
            <div onClick={this.clickHandler} >
              <Image fluid src={showcaseData.imageSrc} />
              <TagHolder tags={showcaseData.tags} />
            </div>
          </div>
          <Card.Content>
            <Card.Meta>
              by {showcaseData.userName}{' '}
              to {showcaseData.hubName}{' '}
              at {showcaseData.createdAt.toString()}
            </Card.Meta>
            <Card.Description>
              {showcaseData.description}
            </Card.Description>
          </Card.Content>
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
    title: PropTypes.string,
    description: PropTypes.string,
    hubName: PropTypes.string,
    imageSrc: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    userId: PropTypes.string,
    userName: PropTypes.string,
  }).isRequired,
};

export default Showcase;
