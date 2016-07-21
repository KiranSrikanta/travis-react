/* eslint-disable */
import TodoListPage from'./todo-list-page'
import {renderComponent} from '../../test-helper';

describe('Todo List Page', function () {
  let component;
  beforeEach(function () {
    component = renderComponent(TodoListPage);
  });
  
  it('has appropriate class', function () {
    expect(component).to.have.class('todo-list-page');
  })
});