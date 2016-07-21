/* eslint-disable */
import TodoList from'./todo-list'
import {renderComponent} from '../../test-helper';

describe('Todo List', function () {
  describe('Without Data', function () {
    let component;
    beforeEach(function () {
      component = renderComponent(TodoList, { todos: [], onComplete: function (index, event) {} });
    });

    it('has appropriate class', function () {
      expect(component).to.have.class('todo-list');
    });

    it('shows "no data" message and has no table', function () {
      expect(component.find('div.alert')).to.exist;
      expect(component.find('table')).to.not.exist;
    });
  });

  describe('With Data', function () {
    let component;
    let onCompleteCallLog = [];
    let state = {
      todos: [
        {
          title: 'task1',
          description: 'important task',
          completed: false,
          date: (new Date()).toISOString().substring(0, 10)
        },
        {
          title: 'task2',
          description: 'another important task',
          completed: false,
          date: (new Date()).toISOString().substring(0, 10)
        }
      ],
      onComplete: function (isComplete, index) {
        onCompleteCallLog.push({isComplete, index});
      }
    };

    beforeEach(function () {
      onCompleteCallLog = [];
      component = renderComponent(TodoList, state);
    });

    it('has appropriate class', function () {
      expect(component).to.have.class('todo-list');
    });

    it('has a table in the root element', function () {
      expect(component.find('> table')).to.exist;
    });

    it('has "tr" for each todo which contains a checkbox for todo completion.', function () {
      var tableRows = component.find('> table > tbody > tr');
      expect(tableRows.length).to.equal(state.todos.length);
      expect(tableRows.find('input[type="checkbox"]').length).to.equal(state.todos.length);
    });

    it('completes todo when checkbox is clicked.', function () {
      component.find('tbody > tr').find('input[type="checkbox"]').eq(0).simulate('change', {"target": {"checked": true}});

      expect(onCompleteCallLog.length).to.equal(1);
      expect(onCompleteCallLog[0].index).to.equal(0);
      expect(onCompleteCallLog[0].isComplete).to.equal(true);


      component.find('tbody > tr').find('input[type="checkbox"]').eq(1).simulate('change', {"target": {"checked": true}});

      expect(onCompleteCallLog.length).to.equal(2);
      expect(onCompleteCallLog[1].index).to.equal(1);
      expect(onCompleteCallLog[1].isComplete).to.equal(true);
    });
  });
});