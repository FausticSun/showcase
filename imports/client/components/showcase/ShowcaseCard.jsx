import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Confirm, Card, Image } from 'semantic-ui-react';
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
      likeArray: this.props.showcase.likes,
      cancelButtonOpen: false,
    };
    this.isLiked = (this.state.likeArray.indexOf(Meteor.userId()) === -1);
  }
  likePost = () => {
    this.props.showcase.toggleLike();
    this.isLiked = !this.isLiked;
  };
  deletePost = () => {
    Meteor.call('showcases.remove', this.props.showcase._id);
    this.setState({ cancelButtonOpen: false });
  };
  showDelete = () => this.setState({ cancelButtonOpen: true });
  confirmDelete = () => {
    this.setState({ cancelButtonOpen: false });
    this.deletePost();
  };
  cancelDelete = () => this.setState({ cancelButtonOpen: false });
  render() {
    const showcaseData = this.props.showcase;
    return (
      <div style={showcaseStyle}>
        <Card fluid>
          { showcaseData.userId === Meteor.userId() ?
            <Image
              label={{ as: 'a', corner: 'right', icon: 'delete' }}
              onClick={this.showDelete}
            /> : '' }
          <Confirm
            open={this.state.cancelButtonOpen}
            content="Are you sure you want to delete your post?"
            cancelButton="Never mind"
            confirmButton="Let's do it"
            onCancel={this.cancelDelete}
            onConfirm={this.confirmDelete}
          />
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
