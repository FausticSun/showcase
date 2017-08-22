import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';

class SubscribeBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
  }

  render() {
    let content;
    let color;
    let icon;

    if (!this.props.isSubscribed) {
      content = 'Subscribe';
      if (!this.state.mouseOver) {
        icon = 'empty star';
        color = 'grey';
      } else {
        icon = 'star';
        color = 'green';
      }
    } else if (!this.state.mouseOver) {
      content = 'Subscribed';
      icon = 'star';
      color = 'green';
    } else {
      content = 'Unsubscribe';
      icon = 'empty star';
      color = 'red';
    }

    return (
      <Button
        content={content}
        icon={icon}
        labelPosition="left"
        color={color}
        onMouseOver={() => this.setState({ mouseOver: true })}
        onMouseLeave={() => this.setState({ mouseOver: false })}
        onClick={this.props.subscribe}
      />
    );
  }
}

SubscribeBtn.propTypes = {
  isSubscribed: PropTypes.bool.isRequired,
  subscribe: PropTypes.func.isRequired,
};

export default SubscribeBtn;
