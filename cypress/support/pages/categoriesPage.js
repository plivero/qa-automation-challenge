// cypress/support/pages/categoriesPage.js
/// <reference types="cypress" />

export class CategoriesSidebar {
  elements = {
    sidebar: () => cy.get(".left-sidebar"),
    womenAccord: () => cy.get('#accordian a[href="#Women"]'),
    menAccord: () => cy.get('#accordian a[href="#Men"]'),
    womenSection: () => cy.get("#Women"),
    menSection: () => cy.get("#Men"),
    womenTopsHeader: () => cy.contains(/WOMEN\s*-\s*TOPS\s*PRODUCTS/i),
    menTshirtsHeader: () => cy.contains(/MEN\s*-\s*TSHIRTS\s*PRODUCTS/i),
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
    this.elements.womenSection().contains(/Tops/i).click({ force: true });
  }

  clickMenTshirts() {
    this.elements
      .menSection()
      .contains(/Tshirts/i)
      .click({ force: true });
  }

  getWomenTopsHeader() {
    return this.elements.womenTopsHeader();
  }

  getMenTshirtsHeader() {
    return this.elements.menTshirtsHeader();
  }
}
