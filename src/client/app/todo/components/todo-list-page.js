import {Link} from 'react-router';
import React, {PropTypes} from 'react';
import TodoList from './todo-list';
import todoActions from '../actions/todo-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TodoListPage extends React.Component {
  constructor() {
    super();

    this.onTodoComplete = this.onTodoComplete.bind(this);
  }

  onTodoComplete(todoChecked, index) {
    const todo = Object.assign({}, this.props.todos[index]);

    todo.completed = todoChecked;
    this.props.actions.updateTodoOnServer(index, todo);
  }

  render() {
    return (
      <div className="todo-list-page">
        <TodoList todos={this.props.todos} onComplete={this.onTodoComplete} />
        <Link to="/todo/new">Add Todo</Link>
      </div>
    );
  }
}

TodoListPage.propTypes = {
  actions: PropTypes.object,
  todos: PropTypes.array
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(todoActions, dispatch)};
},
mapStateToProps = function mapStateToProps(state) {
  return {todos: state.todoReducer};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPage);