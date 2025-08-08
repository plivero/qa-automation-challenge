// @ts-check
/// <reference types="cypress" />

export class ProductsPage {
  visit() {
    cy.visit("/products"); // usa baseUrl
  }

  assertLoaded() {
    // título/heading da página de produtos
    cy.contains(/All Products|Products/i).should("be.visible");
    // grade/lista de produtos visível
    cy.get(".features_items, .product-image-wrapper, .single-products").should(
      "exist"
    );
  }
}
