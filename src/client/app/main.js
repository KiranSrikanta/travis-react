import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configure-store';
import routes from './routes';
import todoActions from './todo/actions/todo-actions';

const store = configureStore();

store.dispatch(todoActions.loadTodosFromServer());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);