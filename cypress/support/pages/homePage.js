// cypress/support/pages/homePage.js

/// <reference types="cypress" />

export class HomePage {
  elements = {
    logo: () => cy.get('img[alt="Website for automation practice"]'),
    navMenu: () => cy.get("ul.nav.navbar-nav"),
    subscriptionEmail: () => cy.get("footer #susbscribe_email"),
    subscriptionSubmit: () => cy.get("footer #subscribe"),
    scrollUpArrow: () => cy.get("#scrollUp"),
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
  subscribeFooterWithDefaults() {
    const email = Cypress.env("USER_EMAIL");
    this.subscribeFooter(email);
  }
  getScrollUpArrow() {
    return this.elements.scrollUpArrow();
  }
  getNavHome() {
    return this.elements.navMenu().contains("Home");
  }
  getNavProducts() {
    return this.elements.navMenu().contains("Products");
  }
  getNavCart() {
    return this.elements.navMenu().contains("Cart");
  }
  getNavSignupLogin() {
    return this.elements.navMenu().contains("Signup / Login");
  }
  getNavTestCases() {
    return this.elements.navMenu().contains("Test Cases");
  }
  getNavApiTesting() {
    return this.elements.navMenu().contains("API Testing");
  }
  getNavVideoTutorials() {
    return this.elements.navMenu().contains("Video Tutorials");
  }
  getNavContactUs() {
    return this.elements.navMenu().contains("Contact us");
  }
  scrollToBottom() {
    cy.scrollTo("bottom");
  }
  scrollToTop() {
    cy.scrollTo("top");
  }
  clickScrollUpArrow() {
    this.elements.scrollUpArrow().click();
  }
  clickNavProducts() {
    this.elements.navMenu().contains("Products").click();
  }
}
