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
  subscribeFooter(email) {
    // escopa no bloco de subscription pra não confundir com outros inputs
    cy.contains(/subscription/i) // título "SUBSCRIPTION"
      .parent() // container do título
      .parent() // sobe pro bloco do footer
      .within(() => {
        cy.get('input[type="email"]').clear().type(email);
        cy.get('button[type="submit"], button').click();
      });
  }

  assertSubscriptionSuccess() {
    cy.contains(/you have been successfully subscribed!/i).should("be.visible");
  }
}
