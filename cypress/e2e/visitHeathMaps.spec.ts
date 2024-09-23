/// <reference types="cypress" />

describe('test heath maps', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should click on sign in button', () => {
    cy.contains('button', 'Sign in').click();
  });
});
