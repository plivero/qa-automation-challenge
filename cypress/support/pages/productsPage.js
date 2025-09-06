// cypress/support/pages/productsPage.js
// @ts-check
/// <reference types="cypress" />

export class ProductsPage {
  elements = {
    title: () => cy.contains(/All Products|Products/i),
    grid: () =>
      cy.get(".features_items, .product-image-wrapper, .single-products"),

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

  openDetailsByName(name) {
    this.elements.cardByName(name).contains("View Product").click();
  }

  addFirstItemToCart() {
    this.elements
      .cards()
      .first()
      .within(() => {
        cy.contains("Add to cart").click({ force: true });
      });
  }

  getCards() {
    return this.elements.cards();
  }

  addItemByIndex(index) {
    this.elements
      .cards()
      .eq(index)
      .contains("Add to cart")
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

  openFirstProduct() {
    this.elements
      .cards()
      .first()
      .contains("View Product")
      .click({ force: true });
  }

  searchDress() {
    this.search("dress");
  }

  searchTops() {
    this.search("tops");
  }

  searchSaree() {
    this.search("saree");
  }

  searchJeans() {
    this.search("jeans");
  }

  searchTshirt() {
    this.search("t-shirt");
  }

  searchInvalid() {
    this.search("xxxxx");
  }
}
