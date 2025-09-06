/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";

const productsPage = new ProductsPage();

describe("UI Platform - TC9: Search Product", () => {
  it("searches by keyword and shows related products", () => {
    // Step 1: Launch browser
    // (handled by Cypress runner)

    // Step 2: Navigate to url 'http://automationexercise.com'
    // Step 4: Click on 'Products' button
    // (go straight to /products for simplicity)
    productsPage.visit();

    // Step 3: Home page is visible successfully
    productsPage.getTitle().should("be.visible");
    productsPage.getGrid().should("exist");

    // Step 5: Verify user is navigated to ALL PRODUCTS page
    cy.location("pathname", { timeout: 10000 }).should("eq", "/products");

    // Step 6: Enter product name and click search
    productsPage.searchDress();

    // Step 7: Verify 'SEARCHED PRODUCTS' is visible
    cy.contains(/Searched Products/i, { timeout: 10000 }).should("be.visible");

    // Step 8: Verify all related products are visible
    productsPage
      .getGrid()
      .find(".product-image-wrapper")
      .its("length")
      .should("be.gt", 0);
  });
});

// Edge cases
describe("UI Platform - TC9 Edge Cases: Search Product", () => {
  beforeEach(() => {
    productsPage.visit();
    productsPage.getTitle().should("be.visible");
    productsPage.getGrid().should("exist");
  });

  it("finds products when searching for 'dress'", () => {
    productsPage.searchDress();
    cy.contains("Searched Products").should("be.visible");
    productsPage
      .getGrid()
      .find(".product-image-wrapper")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'tops'", () => {
    productsPage.searchTops();
    cy.contains("Searched Products").should("be.visible");
    productsPage
      .getGrid()
      .find(".product-image-wrapper")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'saree'", () => {
    productsPage.searchSaree();
    cy.contains("Searched Products").should("be.visible");
    productsPage
      .getGrid()
      .find(".product-image-wrapper")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'jeans'", () => {
    productsPage.searchJeans();
    cy.contains("Searched Products").should("be.visible");
    productsPage
      .getGrid()
      .find(".product-image-wrapper")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 't-shirt'", () => {
    productsPage.searchTshirt();
    cy.contains("Searched Products").should("be.visible");
    productsPage
      .getGrid()
      .find(".product-image-wrapper")
      .its("length")
      .should("be.gt", 0);
  });

  it("shows zero results for a non-existing product", () => {
    productsPage.searchInvalid();
    cy.contains("Searched Products").should("be.visible");
    productsPage
      .getGrid()
      .find(".product-image-wrapper")
      .should("have.length", 0);
  });
});
