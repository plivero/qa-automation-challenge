// cypress/support/pages/homePage.js
// @ts-check
/// <reference types="cypress" />

export class HomePage {
  elements = {
    logo: () => cy.get('img[alt="Website for automation practice"]'),
    navMenu: () => cy.get("ul.nav.navbar-nav"),
    subscriptionEmail: () => cy.get("footer #susbscribe_email"),
    subscriptionSubmit: () => cy.get("footer #subscribe"),
    subscriptionSuccess: () =>
      cy.contains(/you have been successfully subscribed!/i),
    scrollUpArrow: () => cy.get("#scrollUp"),
    heroText: () =>
      cy.contains(/Full-Fledged practice website for Automation Engineers/i),
  };

  visit() {
    cy.visit("/");
  }

  getLogo() {
    return this.elements.logo();
  }

  getNavMenuItem(text) {
    return this.elements.navMenu().contains(text);
  }

  subscribeFooter(email) {
    this.elements.subscriptionEmail().clear().type(email);
    this.elements.subscriptionSubmit().click();
  }

  getSubscriptionSuccessMessage() {
    return this.elements.subscriptionSuccess();
  }

  subscribeFooterWithDefaults() {
    const email = Cypress.env("USER_EMAIL");
    this.subscribeFooter(email);
  }

  getScrollUpArrow() {
    return this.elements.scrollUpArrow();
  }

  getHeroText() {
    return this.elements.heroText();
  }
}
