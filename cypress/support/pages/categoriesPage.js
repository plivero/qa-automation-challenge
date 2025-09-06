// cypress/support/pages/categoriesPage.js
// @ts-check
/// <reference types="cypress" />

export class CategoriesSidebar {
  elements = {
    sidebar: () => cy.get(".left-sidebar"),
    womenAccord: () => cy.get('#accordian a[href="#Women"]'),
    menAccord: () => cy.get('#accordian a[href="#Men"]'),
    womenSection: () => cy.get("#Women"),
    menSection: () => cy.get("#Men"),
  };

  getSidebar() {
    return this.elements.sidebar();
  }

  expandWomen() {
    this.elements.womenAccord().click({ force: true });
  }

  expandMen() {
    this.elements.menAccord().click({ force: true });
  }

  clickWomenTops() {
    this.elements.womenSection().should("be.visible");
    this.elements.womenSection().contains(/Tops/i).click({ force: true });
  }

  clickMenTshirts() {
    this.elements.menSection().should("be.visible");
    this.elements
      .menSection()
      .contains(/Tshirts/i)
      .click({ force: true });
  }
}
