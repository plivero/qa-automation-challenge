// cypress/e2e/specs/personalTests/products-search.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";

const products = new ProductsPage();

describe("Products - Product search", () => {
  beforeEach(() => {
    products.visit(); // open Products page
    products.getTitle().should("be.visible"); // heading visible
    products.getGrid().should("exist"); // grid exists
  });

  it("finds products when searching for 'dress'", () => {
    products.search("dress");
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'tops'", () => {
    products.search("tops");
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'saree'", () => {
    products.search("saree");
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'jeans'", () => {
    products.search("jeans");
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 't-shirt'", () => {
    products.search("t-shirt");
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("shows zero results for a non-existing product", () => {
    products.search("xxxxx");
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .col-sm-4:visible").should("have.length", 0);
  });
});
