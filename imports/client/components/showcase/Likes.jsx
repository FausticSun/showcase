import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Popup } from 'semantic-ui-react';
import { FlowRouter } from 'meteor/kadira:flow-router';

const Likes = props => (
  <div>
    {Meteor.user() ?
      <Button
        color="red"
        content="Like"
        icon="heart"
        label={{ basic: true, color: 'red', pointing: 'left', content: `${props.numLikes}` }}
        onClick={props.clickLike}
      />
        :
      <div>
        <Popup
          trigger={
            <Button
              color="red"
              content="Like"
              icon="heart"
              label={{ basic: true, color: 'red', pointing: 'left', content: `${props.numLikes}` }}
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

Likes.propTypes = {
  numLikes: PropTypes.number.isRequired,
  clickLike: PropTypes.func.isRequired,
};

export default Likes;
