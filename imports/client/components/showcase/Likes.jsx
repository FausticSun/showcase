import React, { Component, PropTypes } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Likes extends Component {
  render () {
    return (
      <div>
        { Meteor.user() ?
          <Button
            color="red"
            content="Like"
            icon="heart"
            label={{ basic: true, color: 'red', pointing: 'left', content: `${this.props.numLikes}` }}
            onClick={this.props.clickLike}
          />
          :
          <div>
            <Popup
              trigger={
                <Button
                  color="red"
                  content="Like"
                  icon="heart"
                  label={{ basic: true, color: 'red', pointing: 'left', content: `${this.props.numLikes}` }}
                />
              }
              content={<Button color="grey" content="Log in to like this" onClick={() => { FlowRouter.go('/login'); }} />}
              on="click"
              position="top left"
            />
          </div>
        }
      </div>
    );
  }
}

Likes.propTypes = {
  numLikes: PropTypes.number.isRequired,
  clickLike: PropTypes.func.isRequired,
};

