/* eslint-disable */
import TodoFormPage from'./todo-form-page'
import {renderComponent} from '../../test-helper';

describe('Todo Form Page', function () {
  let component;
  beforeEach(function () {
    component = renderComponent(TodoFormPage);
  });

  it('has appropriate class', function () {
    expect(component).to.have.class('todo-form-page');
  });
});