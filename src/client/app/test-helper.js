/*eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chaiJQuery from 'chai-jquery';
import configureMockStore from 'redux-mock-store';
import {createStore} from 'redux';
import jQuery from 'jquery';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

const renderComponent = function renderComponent (
  Component,
  props = {},
  state = {}) {
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store={createStore(rootReducer, state)}>
          <Component {...props} />
        </Provider>
    );

    return jQuery(ReactDOM.findDOMNode(componentInstance));
};

const mockStoreCreator = configureMockStore([thunk]);

jQuery.fn.simulate = function simulate (eventName, eventData) {
    const firstElementIndex = 0;
    TestUtils.Simulate[eventName](this[firstElementIndex], eventData);
};

chaiJQuery(chai, chai.util, jQuery);

export {mockStoreCreator, renderComponent};