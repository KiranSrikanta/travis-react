import 'whatwg-fetch';

const todoApi = {
  'getAll': function getAll() {
    return fetch('/api/todos').
      then((response) => response.json());
  },
  'saveTodo': function saveTodo(todo) {
    let resultPromise = null;

    if (todo.id) {
      resultPromise = fetch(`/api/todos/${todo.id}`, {
        'method': 'PUT',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
      });
    } else {
      resultPromise = fetch('/api/todos', {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
      });
    }

    return resultPromise.
      then((response) => response.json());
  }
};

export default todoApi;