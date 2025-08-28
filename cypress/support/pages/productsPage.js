// cypress/support/pages/productsPage.js
// @ts-check
/// <reference types="cypress" />

export class ProductsPage {
  // Action: open All Products
  visit() {
    cy.visit("/products");
  }

  // Action: search term and submit
  search(term) {
    cy.get("#search_product").clear().type(term);
    cy.get("#submit_search").click();
  }

  // Getter: page heading
  getTitle() {
    return cy.contains(/All Products|Products/i);
  }

  // Getter: products grid wrapper
  getGrid() {
    return cy.get(".features_items, .product-image-wrapper, .single-products");
  }

  // Action: open product details by name fragment
  openDetailsByName(name) {
    cy.contains(".productinfo", new RegExp(name, "i"))
      .parents(".product-image-wrapper")
      .contains("View Product")
      .click();
  }

  // Action: add first visible item to cart
  addFirstItemToCart() {
    cy.get(".product-image-wrapper")
      .first()
      .within(() => {
        cy.contains("Add to cart").click({ force: true });
      });
  }

  // Getter: list of product cards (0-based indexing)
  getCards() {
    return cy.get(".features_items .product-image-wrapper");
  }

  // Action: add item by index (0-based)
  addItemByIndex(index) {
    this.getCards()
      .eq(index)
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });
  }

  // Getter: "Added!" modal after adding to cart
  getAddedModal() {
    return cy.contains("Added!");
  }

  // Action: click "View Cart" in modal
  openCartFromModal() {
    cy.contains("View Cart").click();
  }

  // Action: click "Continue Shopping" in modal
  clickContinueShoppingInModal() {
    cy.contains(/Continue Shopping/i, { timeout: 10000 }).click();
  }

  // Open first product quickly
  openFirstProduct() {
    this.getCards().first().contains("View Product").click({ force: true });
  }
}
