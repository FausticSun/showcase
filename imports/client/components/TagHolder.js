import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Tag from './Tag.jsx';

const tagHolderStyle = {
  height: '100%',
  width: '100%',
};

class TagHolder extends Component {
  tags = this.props.tags.map(tag =>
    <Tag tagData={tag} />,
  );

  render() {
    return (
      <div style={tagHolderStyle}>
        {this.tags}
      </div>
    );
  }
}

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
