// cypress/support/pages/brandsPage.js
// @ts-check
/// <reference types="cypress" />

export class BrandsSidebar {
  // Sidebar container
  getSidebar() {
    return cy.get(".brands_products");
  }

  // Click brand by index (0-based)
  clickBrandByIndex(index) {
    this.getSidebar().find("a").eq(index).click({ force: true });
  }

  // Header on brand products page
  getBrandHeader() {
    return cy.contains(/BRAND\s*-\s*.*\s*PRODUCTS/i);
  }

  // Products grid
  getProductsGrid() {
    return cy.get(".features_items");
  }
}
