/*eslint-disable */
import { renderComponent } from '../../test-helper';
import HomePage from './home-page';
import React from 'react';

describe('HomePage', function () {
  let component;
  beforeEach(function () {
    component = renderComponent(HomePage);
  });

  it('contains component class', function () {
    expect(component).to.have.class('home-page');
  });
});