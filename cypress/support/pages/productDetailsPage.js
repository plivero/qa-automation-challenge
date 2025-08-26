// cypress/support/pages/productDetailsPage.js
// @ts-check
/// <reference types="cypress" />

export class ProductDetailsPage {
  getDetailsContainer() {
    return cy.get(".product-information");
  }

  getNameFragment(nameFragment) {
    return cy.contains(".product-information", new RegExp(nameFragment, "i"));
  }

  getCategory() {
    return cy.contains(".product-information", /category/i);
  }

  getPrice() {
    return cy.contains(".product-information", /Rs\.\s*\d/);
  }

  getAvailability() {
    return cy.contains(".product-information", /availability/i);
  }

  getCondition() {
    return cy.contains(".product-information", /condition/i);
  }

  getBrand() {
    return cy.contains(".product-information", /brand/i);
  }

  setQuantity(qty) {
    cy.get("#quantity").clear().type(String(qty));
  }

  addToCartFromDetails() {
    cy.contains("Add to cart").click({ force: true });
  }

  getAddedModal() {
    return cy.contains("Added!");
  }

  openCartFromModal() {
    cy.contains("View Cart").click();
  }
}
