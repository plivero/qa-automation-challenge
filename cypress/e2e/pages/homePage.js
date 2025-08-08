// @ts-check
/// <reference types="cypress" />

export class HomePage {
  visit() {
    // abre a baseUrl definida no cypress.config.js
    cy.visit("/");
  }

  getLogo() {
    return cy.get('img[alt="Website for automation practice"]');
  }

  getNavMenuItem(text) {
    // busca pelo item na navbar (case-sensitive do jeito que você passar)
    return cy.get("ul.nav.navbar-nav").contains(text);
  }
}
