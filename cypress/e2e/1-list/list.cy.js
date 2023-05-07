/// <reference types="cypress" />

import {
  getDaysInMonth,
  getDayOfWeekForFirstDayOfMonth,
  getDayOfWeekForLastDayOfMonth,
} from '../../../utils/dateUtils';

import { getState, login } from '../../utils/utils';

describe('own page', () => {
  before(() => {
    expect(getDaysInMonth, 'getDaysInMonth').to.be.a('function');
    expect(
      getDayOfWeekForFirstDayOfMonth,
      'getDayOfWeekForFirstDayOfMonth'
    ).to.be.a('function');
    expect(
      getDayOfWeekForLastDayOfMonth,
      'getDayOfWeekForLastDayOfMonth'
    ).to.be.a('function');
  });

  beforeEach(() => {
    login();
    cy.visit('/lists');
  });

  it('should have the correct title', () => {
    cy.get('#header-title').should('contain', 'lists');
  });
});
