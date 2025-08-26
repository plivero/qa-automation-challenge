// cypress/support/pages/productsPage.js
// @ts-check
/// <reference types="cypress" />

export class ProductsPage {
  visit() {
    cy.visit("/products");
  }

  // action
  search(term) {
    cy.get("#search_product").clear().type(term);
    cy.get("#submit_search").click();
  }

  // getter (use in spec to assert)
  getTitle() {
    return cy.contains(/All Products|Products/i);
  }

  // getter (use in spec to assert)
  getGrid() {
    return cy.get(".features_items, .product-image-wrapper, .single-products");
  }

  // action
  openDetailsByName(name) {
    cy.contains(".productinfo", new RegExp(name, "i"))
      .parents(".product-image-wrapper")
      .contains("View Product")
      .click();
  }

  // action
  addFirstItemToCart() {
    cy.get(".product-image-wrapper")
      .first()
      .within(() => {
        cy.contains("Add to cart").click({ force: true });
      });
  }

  // getter (modal after add)
  getAddedModal() {
    return cy.contains("Added!");
  }

  // action
  openCartFromModal() {
    cy.contains("View Cart").click();
  }
}
