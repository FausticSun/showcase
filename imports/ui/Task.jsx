import React, { Component, PropTypes } from 'react';

// Task component - represents a single task item
export default class Task extends Component {
    render() {
        return (
            <li>{this.props.task.text}</li>
        );
    }
}

Task.propTypes = {
    // This Component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
};