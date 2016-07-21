import * as actionTypes from '../actions/action-types';

/**
 * Redux reducer for items.
 * @param {state} state of the app with empty default.
 * @param {action} action Any item action.
 * @returns {state} New state from action.
 */
export default function todoReducer(
  state = [],
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_TODO:
      return [...state, Object.assign({}, action.todo)];
    case actionTypes.LOAD_TODO:
      return [...action.todos];
    case actionTypes.UPDATE_TODO:
      {
        const newState = [...state];

        newState[action.index] = Object.assign({}, action.todo);

        return newState;
      }
    default:
      return state;
  }
}