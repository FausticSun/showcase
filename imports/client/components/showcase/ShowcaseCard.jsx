import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
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
      likeArray: this.props.showcase.likes,
    };
    this.isLiked = (this.state.likeArray.indexOf(Meteor.userId()) === -1);
  }
  likePost = () => {
    this.props.showcase.toggleLike();
    this.isLiked = !this.isLiked;
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
              by <a href={`/${showcaseData.userUsername}`}>{showcaseData.userDisplayname}</a>
              to <a href={`/hub/${showcaseData.hubName}`}>{showcaseData.hubName}{' '}</a>
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
              isLiked={this.isLiked}
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
