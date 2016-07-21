import React, {PropTypes} from 'react';
import TodoForm from './todo-form';
import todoActions from '../actions/todo-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TodoFormPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    let todo = {
      title: '',
      description: '',
      date: new Date(),
      completed: false
    };

    if (props.params && props.params.id) {
      const todoProp = this.props.todos[props.params.id];

      todo = Object.assign({}, todoProp);
      todo.date = new Date(todoProp.date);
    }

    this.state = { todo };

    this.saveTodo = this.saveTodo.bind(this);
  }

  saveTodo(todo) {
    if (this.props.params && this.props.params.id) {
      this.props.actions.updateTodoOnServer(this.props.params.id, todo);
    } else {
      this.props.actions.createTodoOnServer(todo);
    }
  }

  render() {
    return (
      <div className="todo-form-page container">
        <TodoForm todo={this.state.todo} onSave={this.saveTodo} />
      </div>
    )
  }
}

TodoFormPage.propTypes = {
  actions: PropTypes.object,
  params: PropTypes.object,
  todos: PropTypes.array.isRequired
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(todoActions, dispatch) };
},
  mapStateToProps = function mapStateToProps(state) {
    return { todos: state.todoReducer };
  };

export default connect(mapStateToProps, mapDispatchToProps)(TodoFormPage);