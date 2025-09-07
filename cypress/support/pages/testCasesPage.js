// cypress/support/pages/testCasesPage.js
/// <reference types="cypress" />

export class TestCasesPage {
  elements = {
    title: () => cy.contains(/Test Cases/i),
    firstCaseItem: () => cy.contains(/Test Case 1:\s*Register User/i),
  };

  getTitle() {
    return this.elements.title();
  }

  getFirstCaseItem() {
    return this.elements.firstCaseItem();
  }
}
