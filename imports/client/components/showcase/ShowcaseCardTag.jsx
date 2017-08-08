import React from 'react';
import { PropTypes } from 'prop-types';
import { Popup } from 'semantic-ui-react';
import { Tag } from '../../../api/showcases.js';

export const TagSize = 25;

const initialTagStyle = {
  fontSize: '0.75em',
  textAlign: 'center',
  verticalAlign: 'middle',
  paddingTop: '5px',

  background: 'white',
  borderRadius: '50%',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',

  position: 'absolute',
  height: TagSize,
  width: TagSize,
};

const ShowcaseCardTag = (props) => {
  const finalTagStyle = {
    ...initialTagStyle,
    left: props.tagData.left,
    top: props.tagData.top,
  };

  const displayedTag = (
    <div style={finalTagStyle}>
      <span>{props.index}</span>
    </div>
  );

  const popupContent = (
    <a href={props.tagData.itemURL}> {props.tagData.itemName} </a>
  );

  return (
    <Popup
      trigger={displayedTag}
      content={popupContent}
      hoverable
    />
  );
};

ShowcaseCardTag.propTypes = {
  tagData: PropTypes.instanceOf(Tag).isRequired,
  index: PropTypes.number.isRequired,
};

export default ShowcaseCardTag;
