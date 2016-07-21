import 'babel-polyfill';
import React, {PropTypes} from 'react';

class TodoForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    const todoInitialState = Object.assign({}, props.todo);

    todoInitialState.date = this.toJSONWithoutTZ(todoInitialState.date);

    this.state = {
      todo: todoInitialState,
      errors: { titleRequired: false }
    };

    this.onTodoChange = this.onTodoChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  /* eslint-disable no-magic-numbers */
  toJSONWithoutTZ(datetime) {
    datetime.setMinutes(datetime.getMinutes() - new Date().getTimezoneOffset());
    datetime.setSeconds(0);

    return datetime.toJSON().slice(0, 19);
  }

  toDateTime(datetimeString) {
    const date = new Date(datetimeString);

    date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());

    return date;
  }

  /* eslint-enable no-magic-numbers */

  onTodoChange(event) {
    event.preventDefault();
    const todo = this.state.todo;

    todo[event.target.id] = event.target.value;
    this.setState({todo});
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.todo.title === '') {
      this.setState({ errors: { titleRequired: true } });
    } else {
      this.setState({ errors: { titleRequired: false } });
      const todo = this.state.todo;

      todo.date = this.toDateTime(todo.date);

      this.props.onSave(todo);

      this.context.router.push('/todo');
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.context.router.push('/todo');
  }

  render() {
    // eslint-disable-next-line no-ternary
    let titleGroupClass = this.state.errors.titleRequired ? 'form-group has-error' : 'form-group';

    return (
      <div className="todo-form">
        <h1>Todo Form</h1>
        <form role="form" onSubmit={this.onFormSubmit}>
          <div className={titleGroupClass}>
            <label data-for="title">Title</label>
            <input type="text" className="form-control" id="title" value={this.state.todo.title} onChange={this.onTodoChange} />
          </div>

          <div className="form-group">
            <label data-for="description">Description</label>
            <textarea className="form-control" id="description" value={this.state.todo.description} onChange={this.onTodoChange} />
          </div>

          <div className="form-group">
            <label data-for="date">Date</label>
            <input type="datetime-local" className="form-control" id="date" value={this.state.todo.date} onChange={this.onTodoChange} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-default" onClick={this.onCancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

TodoForm.propTypes = {
  todo: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
};

TodoForm.contextTypes = {router: PropTypes.object};

export default TodoForm;