import {IndexRoute, Route} from 'react-router';
import App from './common/components/app';
import HomePage from './home/components/home-page';
import React from 'react';
import TodoPage from './todo/components/todo-page';
// import TodoListPage from './todo/components/todo-list-page';
// import TodoFormPage from './todo/components/todo-form-page';

const lazyLoadComponent = (ComponentPath) => {
  const lazyLoadComponentFn = (location, cb) => {
    require.ensure([], (require) => {
      cb(null, require(ComponentPath).default);
    });
  }

  return lazyLoadComponentFn;
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="todo" component={TodoPage}>
      <IndexRoute getComponent={lazyLoadComponent('./todo/components/todo-list-page') } />
      <Route path="new" getComponent={lazyLoadComponent('./todo/components/todo-form-page') }/>
      <Route path="edit/:id" getComponent={lazyLoadComponent('./todo/components/todo-form-page') }/>
    </Route>
  </Route>
);