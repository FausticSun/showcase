import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Segment, Form } from 'semantic-ui-react';

const initialTagInputStyle = {
  position: 'absolute',
  width: '200px',
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
    this.props.newTagHandler({
      left: this.props.clickPos.left,
      top: this.props.clickPos.top,
      itemName: this.state.itemName,
      itemURL: this.state.itemURL,
    });
    this.setState({ itemName: '', itemURL: '' });
  };

  onChangeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  render() {
    const finalTagInputStyle = {
      ...initialTagInputStyle,
      left: this.props.clickPos.left,
      top: this.props.clickPos.top,
    };

    const { itemName, itemURL } = this.state;

    return (
      <Segment style={finalTagInputStyle}>
        <Form size="mini" onSubmit={this.onSubmitHandler}>
          <Form.Input name="itemName" value={itemName} placeholder="Item Name" onChange={this.onChangeHandler} />
          <Form.Input name="itemURL" value={itemURL} placeholder="URL" onChange={this.onChangeHandler} />
          <Form.Button style={{ display: 'none' }}>Submit</Form.Button>
        </Form>
      </Segment>
    );
  }
}

TagInput.propTypes = {
  clickPos: PropTypes.shape({
    left: PropTypes.string,
    top: PropTypes.string,
  }).isRequired,
  newTagHandler: PropTypes.func.isRequired,
};

export default TagInput;
