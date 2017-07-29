import React, { Component, PropTypes } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import TagHolder from './TagHolder.jsx';
import Likes from './Likes.jsx';
import TagList from './TagList.jsx';

const showcaseStyle = {
  width: '600px',
  marginBottom: '20px',
};

class Showcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null,
      likeArray: this.props.showcaseData.likes,
    };
  }
  likePost = () => {
    Meteor.call('showcases.likePost', this.props.showcaseData._id);
  };

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
          <Card.Content>
            <Card.Header>
              Title
            </Card.Header>
            <Card.Description>
              <span>
                <Likes
                  numLikes={this.props.showcaseData.likes.length}
                  clickLike={this.likePost}
                />
              </span>
              <br />
              <h2>Items found in this Showcase</h2>
              <TagList tags={this.props.showcaseData.tags} />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
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
    hubName: PropTypes.string,
    imageSrc: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    userId: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Showcase;
