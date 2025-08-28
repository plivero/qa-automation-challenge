// cypress/support/pages/categoriesPage.js
// @ts-check
/// <reference types="cypress" />

export class CategoriesSidebar {
  // Container on the left
  getSidebar() {
    return cy.get(".left-sidebar");
  }

  // Rxpand accordions
  expandWomen() {
    cy.get('#accordian a[href="#Women"]').click({ force: true });
  }

  expandMen() {
    cy.get('#accordian a[href="#Men"]').click({ force: true });
  }

  // Click subcategories
  clickWomenTops() {
    cy.get("#Women").should("be.visible");
    cy.get("#Women").contains(/Tops/i).click({ force: true });
  }

  clickMenTshirts() {
    cy.get("#Men").should("be.visible");
    cy.get("#Men")
      .contains(/Tshirts/i)
      .click({ force: true });
  }

  // Header on category products page
  getCategoryHeader(regex) {
    return cy.contains(regex);
  }
}
