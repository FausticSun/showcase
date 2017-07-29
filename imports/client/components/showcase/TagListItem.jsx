import React, { PropTypes } from 'react';
import { List } from 'semantic-ui-react';

const TagListItem = (props) => {
  return (
    <List.Item>
      <a className="labelTextUrl" href={props.tagData.itemURL}>
        {props.tagData.itemName}
      </a>
    </List.Item>
  );
};

TagListItem.propTypes = {
  tagData: PropTypes.shape({
    itemName: PropTypes.string,
    itemURL: PropTypes.string,
  }).isRequired,
};

export default TagListItem;
