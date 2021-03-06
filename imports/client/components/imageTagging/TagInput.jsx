import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Tag } from '../../../api/showcases.js';
import { initialTagStyle } from '../showcase/ShowcaseCardTag.jsx';

const initialTagInputStyle = {
  position: 'absolute',
  zIndex: '99',
};
const inputFormStyle = {
  width: '200px',
  marginTop: '35px',
};


const cancelButtonStyle = {
  position: 'absolute',
  left: '93%',
  bottom: '86%',
};
class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemURL: '',
    };
  }

  onSubmitHandler = () => {
    const newTag = new Tag();
    newTag.left = this.props.clickPos.left;
    newTag.top = this.props.clickPos.top;
    newTag.itemName = this.state.itemName;
    newTag.itemURL = this.state.itemURL;
    this.props.newTagHandler(newTag);
    this.setState({ itemName: '', itemURL: '' });
  };

  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  cancelTagInput = () => {
    this.setState({ itemName: '', itemURL: '' });
    this.props.cancelTagInput();
  };

  render() {
    const finalTagInputStyle = {
      ...initialTagInputStyle,
      left: this.props.clickPos.left,
      top: this.props.clickPos.top,
    };

    const { itemName, itemURL } = this.state;

    return (
      <div style={finalTagInputStyle}>
        <div style={initialTagStyle}>
          <span>{this.props.numTags+1}</span>
        </div>
        <Segment style={inputFormStyle}>
          <Button icon circular size="mini" style={cancelButtonStyle} onClick={this.cancelTagInput}>
            <Icon name="x" />
          </Button>
          <Form size="mini" onSubmit={this.onSubmitHandler}>
            <Form.Input name="itemName" value={itemName} placeholder="Item Name" onChange={this.onChangeHandler} />
            <Form.Input name="itemURL" value={itemURL} placeholder="URL" onChange={this.onChangeHandler} />
            <Form.Button style={{ display: 'none' }}>Submit</Form.Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

TagInput.propTypes = {
  clickPos: PropTypes.shape({
    left: PropTypes.string,
    top: PropTypes.string,
  }).isRequired,
  newTagHandler: PropTypes.func.isRequired,
  cancelTagInput: PropTypes.func.isRequired,
  numTags: PropTypes.number.isRequired,
};

export default TagInput;
