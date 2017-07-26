import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Popup } from 'semantic-ui-react';

export const TagSize = 25;

const initialTagStyle = {
  fontSize: '12px',
  textAlign: 'center',
  verticalAlign: 'middle',

  background: 'white',
  borderRadius: '50%',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',

  position: 'absolute',
  height: TagSize,
  width: TagSize,
};

class Tag extends Component {
  render() {
    const finalTagStyle = {
      ...initialTagStyle,
      left: this.props.tagData.left,
      top: this.props.tagData.top,
    };

    const displayedTag = (
      <div style={finalTagStyle}>
        <span>{this.props.index}</span>
      </div>
    );

    const popupContent = (
      <a href={this.props.tagData.itemURL}> {this.props.tagData.itemName} </a>
    );

    return (
      <Popup
        trigger={displayedTag}
        content={popupContent}
        hoverable
      />
    );
  }
}

Tag.propTypes = {
  tagData: PropTypes.shape({
    left: PropTypes.string,
    top: PropTypes.string,
    itemName: PropTypes.string,
    itemURL: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Tag;
