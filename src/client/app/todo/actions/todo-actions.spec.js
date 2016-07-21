/*eslint-disable */
import { mockStoreCreator } from '../../test-helper';
import * as actionTypes from './action-types';
import todoActions from './todo-actions';

describe('Todo Actions', function () {
  describe('load todos', function () {
    let stubedFetch;
    beforeEach(() => {
      stubedFetch = sinon.stub(window, 'fetch');
    });

    it('should create a "load todos" action', function () {
      const todos = [
        {
          id: 'task1',
          title: 'task1',
          description: 'important task',
          date: new Date(),
          completed: false
        }
      ];

      const response = { json: function () { } };
      let stubedJsonResponse = sinon.stub(response, 'json');
      stubedJsonResponse.returnsPromise().resolves(todos);
      stubedFetch.returnsPromise().resolves(response);

      const store = mockStoreCreator();


      store.dispatch(todoActions.loadTodosFromServer());


      const actions = store.getActions();
      expect(stubedFetch).to.have.been.calledWith("/api/todos");
      expect(actions[0].type).to.equal(actionTypes.LOAD_TODO);
      expect(actions[0].todos).to.deep.equal(todos);
    });

    afterEach(() => {
      sinon.restore(window.fetch);
    });
  });
});