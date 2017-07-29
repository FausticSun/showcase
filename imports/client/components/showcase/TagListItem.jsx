import React, { PropTypes } from 'react';
import { List } from 'semantic-ui-react';

const TagListItem = (props) => {
  return (
    <List.Item>
      <span>{props.tagData.index}</span>
      <a className="labelTextUrl" href={props.tagData.itemURL}>
        {props.tagData.itemName} - {props.tagData.itemURL}
      </a>
    </List.Item>
  );
};

TagListItem.propTypes = {
  tagData: PropTypes.shape({
    itemName: PropTypes.string,
    itemURL: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TagListItem;
