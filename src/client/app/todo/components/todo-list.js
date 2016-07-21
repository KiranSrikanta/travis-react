import {Link} from 'react-router';
import React, {PropTypes} from 'react';

class TodoList extends React.Component {
  constructor() {
    super();
    this.renderTodo = this.renderTodo.bind(this);
  }

  onTodoToggle(index, event) {
    this.props.onComplete(event.target.checked, index);
  }

  renderTodo(todo, index) {
    return (
      <tr key={index}>
        <td><Link to={`todo/edit/${index}`}>{todo.title}</Link></td>
        <td>{todo.description}</td>
        <td>{new Date(todo.date).toLocaleString()}</td>
        <td><input type="checkbox" checked={todo.completed} onChange={this.onTodoToggle.bind(this, index)} /></td>
      </tr>
    );
  }

  render() {
    const emptyTastListLength = 0;
    let todoListOrMessage = false;

    if (this.props.todos.length === emptyTastListLength) {
      todoListOrMessage = <div className="alert alert-warning">No todos.</div>
    } else {
      todoListOrMessage =
        <table className="table">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.props.todos.map(this.renderTodo) }
          </tbody>
        </table>
    }

    return (
      <div className="todo-list">
        <h1>Todos</h1>
        {todoListOrMessage}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired
}

export default TodoList;