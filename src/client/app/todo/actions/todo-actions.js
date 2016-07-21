import * as actionTypes from './action-types';
import todoApi from '../../api/todo';

const todoActions = {
  'createTodo': (todo) => {
    const action = {
      'type': actionTypes.CREATE_TODO,
      todo
    };

    return action;
  },
  'updateTodo': (index, todo) => {
    const action = {
      'type': actionTypes.UPDATE_TODO,
      todo,
      index
    };

    return action;
  },
  'loadTodo': (todos) => {
    const action = {
      'type': actionTypes.LOAD_TODO,
      todos
    };

    return action;
  },
  'loadTodosFromServer': () => {
    const dispacher = (dispach) => {
      todoApi.getAll().
      then((todos) => {
        dispach(todoActions.loadTodo(todos));
      }).
      catch((err) => {
        throw err;
      })
    };

    return dispacher;
  },
  'createTodoOnServer': (todo) => {
    const dispacher = (dispach) => {
      todoApi.saveTodo(todo).
      then((todoData) => {
        dispach(todoActions.createTodo(todoData));
      }).
      catch((err) => {
        throw err;
      })
    };

    return dispacher;
  },
  'updateTodoOnServer': (index, todo) => {
    const dispacher = (dispach) => {
      todoApi.saveTodo(todo).
      then((todoData) => {
        dispach(todoActions.updateTodo(index, todoData));
      }).
      catch((err) => {
        throw err;
      })
    };

    return dispacher;
  }
};

export default todoActions;