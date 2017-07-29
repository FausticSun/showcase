import React from 'react';
import { PropTypes } from 'prop-types';
import Tag from './Tag.jsx';

const tagHolderStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
};

const TagHolder = (props) => {
  const tags = props.tags.map((tag, index) =>
    <Tag tagData={tag} index={index + 1} key={index} />,
  );

  return (
    <div style={tagHolderStyle}>
      {tags}
    </div>
  );
};

TagHolder.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })),
};

TagHolder.defaultProps = {
  tags: [],
};

export default TagHolder;
