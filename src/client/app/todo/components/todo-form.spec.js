/* eslint-disable */
import TodoFormPage from'./todo-form'
import {renderComponent} from '../../test-helper';

describe('Todo Form', function () {
  let component;
  const todo = {
    title: '',
    description: '',
    date: new Date(),
    completed: false
  };
  beforeEach(function () {
    component = renderComponent(TodoFormPage, {todo, onSave: () => {}});
  });

  it('has appropriate class', function () {
    expect(component).to.have.class('todo-form');
  });

  it('has a form', function () {
    expect(component.find('form')).to.exist;
  });

  it('has a textbox form field for title', function () {
    expect(component.find('form input[type="text"][id="title"]')).to.exist;
  });

  it('has a textarea form field for description', function () {
    expect(component.find('form textarea[id="description"]')).to.exist;
  });

  it('has a datepicker form field for date', function () {
    expect(component.find('form input[type="datetime-local"][id="date"]')).to.exist;
  });

  it('has a submit button', function () {
    expect(component.find('form button')).to.exist;
  });

  it('shows error when empty title is submitted', function () {
    expect(component.find('form input[type="text"][id="title"]').parent()).to.not.have.class('has-error');
    component.find('form').simulate('submit');
    expect(component.find('form input[type="text"][id="title"]').parent()).to.have.class('has-error');
  });
});