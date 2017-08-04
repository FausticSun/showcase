import React from 'react';
import { PropTypes } from 'prop-types';
import ShowcaseCardTag from './ShowcaseCardTag.jsx';

const tagHolderStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
};

const ShowcaseCardTagHolder = (props) => {
  const tags = props.tags.map((tag, index) =>
    <ShowcaseCardTag tagData={tag} index={index + 1} key={index} />,
  );

  return (
    <div style={tagHolderStyle}>
      {tags}
    </div>
  );
};

ShowcaseCardTagHolder.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })),
};

ShowcaseCardTagHolder.defaultProps = {
  tags: [],
};

export default ShowcaseCardTagHolder;
