// cypress/support/pages/accountStatusPage.js
// @ts-check
/// <reference types="cypress" />

export class AccountStatusPage {
  // "ACCOUNT CREATED!"
  getAccountCreatedMessage() {
    return cy.contains(/ACCOUNT CREATED!/i, { timeout: 10000 });
  }

  // "ACCOUNT DELETED!"
  getAccountDeletedMessage() {
    return cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 });
  }

  // "Logged in as <name>"
  getLoggedInLabel() {
    return cy.contains("Logged in as");
  }

  clickContinue() {
    cy.get('[data-qa="continue-button"]').click({ force: true });
  }

  clickDeleteAccount() {
    cy.contains("Delete Account").click();
  }
}
