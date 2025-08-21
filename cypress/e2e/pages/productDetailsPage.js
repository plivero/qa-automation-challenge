// @ts-check
/// <reference types="cypress" />

export class ProductDetailsPage {
  /**
   * Validates the product details page.
   * If "nameFragment" is provided, checks that the product name appears in the block.
   */
  assertDetails(nameFragment) {
    cy.get(".product-information").should("be.visible");

    if (nameFragment) {
      cy.contains(".product-information", new RegExp(nameFragment, "i")).should(
        "be.visible"
      );
    }

    cy.get(".product-information").within(() => {
      cy.contains(/category/i).should("be.visible");
      cy.contains(/Rs\.\s*\d/).should("be.visible"); // price format "Rs. 1000"
      cy.contains(/availability/i).should("be.visible");
      cy.contains(/condition/i).should("be.visible");
      cy.contains(/brand/i).should("be.visible");
    });
  }

  setQuantity(qty) {
    // quantity input field on product details
    cy.get("#quantity").clear().type(String(qty));
  }

  addToCartFromDetails() {
    cy.contains("Add to cart").click({ force: true });
    cy.contains("Added!").should("be.visible");
  }

  openCartFromModal() {
    cy.contains("View Cart").click();
  }
}
