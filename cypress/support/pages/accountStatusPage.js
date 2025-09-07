// cypress/support/pages/accountStatusPage.js
/// <reference types="cypress" />

export class AccountStatusPage {
  elements = {
    accountCreatedMessage: () =>
      cy.contains(/ACCOUNT CREATED!/i, { timeout: 10000 }),
    accountDeletedMessage: () =>
      cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 }),
    loggedInLabel: () => cy.contains("Logged in as"),
    continueBtn: () => cy.get('[data-qa="continue-button"]'),
    deleteAccountLink: () => cy.contains("Delete Account"),
  };

  getAccountCreatedMessage() {
    return this.elements.accountCreatedMessage();
  }
  getAccountDeletedMessage() {
    return this.elements.accountDeletedMessage();
  }
  getLoggedInLabel() {
    return this.elements.loggedInLabel();
  }

  clickContinue() {
    this.elements.continueBtn().click({ force: true });
  }
  clickDeleteAccount() {
    this.elements.deleteAccountLink().click();
  }
}
