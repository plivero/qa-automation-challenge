// @ts-check
/// <reference types="cypress" />

export class HomePage {
  visit() {
    cy.visit("https://www.automationexercise.com/");
  }

  getLogo() {
    return cy.get('img[alt="Website for automation practice"]');
  }

  getNavMenuItem(itemText) {
    return cy.get("ul.nav.navbar-nav").contains(itemText);
  }
}
