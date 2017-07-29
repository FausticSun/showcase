import React, { PropTypes } from 'react';
import { List } from 'semantic-ui-react';
import TagListItem from './TagListItem.jsx';

const TagList = (props) => {
  const TagListItems = props.tags.map((tag, index) =>
    <TagListItem tagData={tag} index={index + 1} key={index} />,
  );
  return (
    <List ordered>
      {TagListItems}
    </List>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })),
};

TagList.defaultProps = {
  tags: [],
};

export default TagList;

