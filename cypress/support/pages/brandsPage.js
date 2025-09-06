// cypress/support/pages/brandsPage.js
/// <reference types="cypress" />

export class BrandsSidebar {
  elements = {
    sidebar: () => cy.get(".brands_products"),
    brandHeader: () => cy.contains(/BRAND\s*-\s*.*\s*PRODUCTS/i),
    productsGrid: () => cy.get(".features_items"),
  };

  getSidebar() {
    return this.elements.sidebar();
  }

  clickBrandByIndex(index) {
    this.elements.sidebar().find("a").eq(index).click({ force: true });
  }

  getBrandHeader() {
    return this.elements.brandHeader();
  }

  getProductsGrid() {
    return this.elements.productsGrid();
  }
}
