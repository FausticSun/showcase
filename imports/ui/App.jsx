import React, { Component } from 'react';

import Task from './Task.jsx';

// App component, represents the whole app
export default class App extends Component {
  constructor() {
    super();
    this.taskList = [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }
  getTasks() {
    return this.taskList;
  }

  renderTasks() {
    return this.getTasks().map(task => (
      <Task key={task.id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}
