// cypress/support/pages/recommendedPage.js
// @ts-check
/// <reference types="cypress" />

export class RecommendedPage {
  visitAndScrollToSection() {
    cy.visit("/");
    cy.scrollTo("bottom", { duration: 500 });
  }

  getSectionTitle() {
    return cy.contains(/RECOMMENDED ITEMS/i);
  }

  getSection() {
    return cy.get(".recommended_items");
  }

  addFirstRecommendedToCart() {
    cy.get(".recommended_items .productinfo p")
      .first()
      .invoke("text")
      .then((t) => cy.wrap(t.trim()).as("recName"));

    cy.get(".recommended_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });
  }

  openCartFromModal() {
    cy.contains(/View Cart/i, { timeout: 10000 }).click();
  }

  assertFirstRecommendedInCart() {
    cy.get("@recName").then((name) => {
      cy.get("#cart_info_table").should("contain.text", name);
    });
  }
}
