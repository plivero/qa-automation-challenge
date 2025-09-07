// cypress/support/pages/productsPage.js
/// <reference types="cypress" />

export class ProductsPage {
  elements = {
    title: () => cy.contains(/All Products|Products/i),

    grid: () => cy.get(".features_items"),

    searchInput: () => cy.get("#search_product"),
    searchBtn: () => cy.get("#submit_search"),
    cards: () => cy.get(".features_items .product-image-wrapper"),
    cardByName: (name) => cy.get(".productinfo").contains(name),

    addToCartBtn: () => cy.contains("Add to cart"),
    addedModal: () => cy.contains("Added!"),
    viewCartBtn: () => cy.contains("View Cart"),
    continueShoppingBtn: () =>
      cy.contains(/Continue Shopping/i, { timeout: 10000 }),
  };

  visit() {
    cy.visit("/products");
  }

  search(term) {
    this.elements.searchInput().clear().type(term);
    this.elements.searchBtn().click();
  }

  getTitle() {
    return this.elements.title();
  }

  getGrid() {
    return this.elements.grid();
  }

  getProductCards() {
    return this.elements.cards();
  }

  openDetailsByName(name) {
    this.elements.cardByName(name).contains("View Product").click();
  }

  addFirstItemToCart() {
    this.elements
      .cards()
      .first()
      .contains("Add to cart")
      .click({ force: true });
  }

  addItemByIndex(index) {
    this.elements
      .cards()
      .eq(index)
      .contains("Add to cart")
      .click({ force: true });
  }

  openFirstProduct() {
    this.elements
      .cards()
      .first()
      .contains("View Product")
      .click({ force: true });
  }

  getAddedModal() {
    return this.elements.addedModal();
  }

  openCartFromModal() {
    this.elements.viewCartBtn().click();
  }

  clickContinueShoppingInModal() {
    this.elements.continueShoppingBtn().click();
  }
}
