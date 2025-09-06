// cypress/support/pages/recommendedPage.js
// @ts-check
/// <reference types="cypress" />

export class RecommendedPage {
  elements = {
    sectionTitle: () => cy.contains(/RECOMMENDED ITEMS/i),

    recNames: () => cy.get(".recommended_items .productinfo p"),
    firstRecName: () => cy.get(".recommended_items .productinfo p").first(),

    recCards: () => cy.get(".recommended_items .product-image-wrapper"),
    firstRecCard: () =>
      cy.get(".recommended_items .product-image-wrapper").first(),

    viewCartBtn: () => cy.contains(/View Cart/i, { timeout: 10000 }),
    cartTable: () => cy.get("#cart_info_table"),
  };

  visitAndScrollToSection() {
    cy.visit("/");
    this.elements.sectionTitle().scrollIntoView();
  }

  getSectionTitle() {
    return this.elements.sectionTitle();
  }

  getSection() {
    return cy.get(".recommended_items");
  }

  addFirstRecommendedToCart() {
    this.elements.firstRecCard().contains("Add to cart").click({ force: true });
  }

  openCartFromModal() {
    this.elements.viewCartBtn().click();
  }

  getCartTable() {
    return this.elements.cartTable();
  }
}
