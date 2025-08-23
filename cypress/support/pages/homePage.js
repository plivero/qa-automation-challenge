// @ts-check
/// <reference types="cypress" />

export class HomePage {
  visit() {
    // opens the baseUrl defined in cypress.config.js
    cy.visit("/");
  }

  getLogo() {
    return cy.get('img[alt="Website for automation practice"]');
  }

  getNavMenuItem(text) {
    // looks for the item in the navbar (case-sensitive as you pass it)
    return cy.get("ul.nav.navbar-nav").contains(text);
  }

  subscribeFooter(email) {
    // scope within the subscription block to avoid confusing with other inputs
    cy.contains(/subscription/i) // title "SUBSCRIPTION"
      .parent() // title container
      .parent() // go up to the footer block
      .within(() => {
        cy.get('input[type="email"]').clear().type(email);
        cy.get('button[type="submit"], button').click();
      });
  }

  assertSubscriptionSuccess() {
    cy.contains(/you have been successfully subscribed!/i).should("be.visible");
  }
}
