import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import ShowcaseCardTagHolder from './ShowcaseCardTagHolder.jsx';
import Likes from './Likes.jsx';
import TagList from './TagList.jsx';
import { Showcase } from '../../../api/showcases.js';

const showcaseStyle = {
  width: '600px',
  marginBottom: '20px',
};

class ShowcaseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null,
      likeArray: this.props.showcase.likes,
    };
  }
  likePost = () => {
    this.props.showcase.toggleLike();
  };

  render() {
    const showcaseData = this.props.showcase;
    return (
      <div style={showcaseStyle}>
        <Card fluid>
          <Card.Content>
            <Card.Header as="a" href={`/p/${showcaseData._id}`}>
              {showcaseData.title}
            </Card.Header>
            <Card.Meta>
              by {showcaseData.userName}{' '}
              to {showcaseData.hubName}{' '}
              on {showcaseData.createdAt.toDateString()}
            </Card.Meta>
          </Card.Content>
          <div style={{ position: 'relative' }}>
            <div onClick={this.clickHandler} >
              <Image fluid src={showcaseData.imageSrc} />
              <ShowcaseCardTagHolder tags={showcaseData.tags} />
            </div>
          </div>
          <Card.Content>
            <TagList tags={showcaseData.tags} />
          </Card.Content>
          <Card.Content>
            <Card.Description>
              {showcaseData.description}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Likes
              numLikes={showcaseData.likes.length}
              clickLike={this.likePost}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

ShowcaseCard.propTypes = {
  showcase: PropTypes.instanceOf(Showcase).isRequired,
};

export default ShowcaseCard;
