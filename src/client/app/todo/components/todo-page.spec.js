/* eslint-disable */
import TodoPage from'./todo-page'
import {renderComponent} from '../../test-helper';

describe('Todo Page', function () {
  let component;
  beforeEach(function () {
    component = renderComponent(TodoPage);
  });
  
  it('has appropriate class', function () {
    expect(component).to.have.class('todo-page');
  })
});