// cypress/support/pages/homePage.js
// @ts-check
/// <reference types="cypress" />

export class HomePage {
  visit() {
    cy.visit("/");
  }

  getLogo() {
    return cy.get('img[alt="Website for automation practice"]');
  }

  getNavMenuItem(text) {
    return cy.get("ul.nav.navbar-nav").contains(text);
  }

  subscribeFooter(email) {
    cy.contains(/subscription/i)
      .parent()
      .parent()
      .within(() => {
        cy.get('input[type="email"]').clear().type(email);
        cy.get('button[type="submit"], button').click();
      });
  }

  getSubscriptionSuccessMessage() {
    return cy.contains(/you have been successfully subscribed!/i);
  }
  subscribeFooterWithDefaults() {
    const email = Cypress.env("USER_EMAIL");
    this.subscribeFooter(email);
  }
}
