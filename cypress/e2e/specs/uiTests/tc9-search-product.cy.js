/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";

const products = new ProductsPage();

describe("UI Platform - TC9: Search Product", () => {
  it("searches by keyword and shows related products", () => {
    const term = "dress";

    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home page is visible
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click on 'Products' button
    cy.get('a[href="/products"]').first().click({ force: true });

    // 5) Verify user is navigated to ALL PRODUCTS page
    cy.location("pathname", { timeout: 10000 }).should("eq", "/products");
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");

    // 6) Enter product name and click search
    products.searchDress();

    // 7) Verify 'SEARCHED PRODUCTS' is visible
    cy.contains(/Searched Products/i, { timeout: 10000 }).should("be.visible");

    // 8) Verify all related products are visible
    products
      .getGrid()
      .find(".product-image-wrapper")
      .should("have.length.greaterThan", 0)
      .each(($card) => cy.wrap($card).should("be.visible"));
  });
});

// personal edge cases kept as-is, but using ProductsPage
describe("UI Platform - TC9 Edge Cases: Search Product", () => {
  beforeEach(() => {
    products.visit();
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");
  });

  it("finds products when searching for 'dress'", () => {
    products.searchDress();
    cy.contains("Searched Products").should("be.visible");
    products
      .getGrid()
      .find(".col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'tops'", () => {
    products.searchTops();
    cy.contains("Searched Products").should("be.visible");
    products
      .getGrid()
      .find(".col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'saree'", () => {
    products.searchSaree();
    cy.contains("Searched Products").should("be.visible");
    products
      .getGrid()
      .find(".col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 'jeans'", () => {
    products.searchJeans();
    cy.contains("Searched Products").should("be.visible");
    products
      .getGrid()
      .find(".col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("finds products when searching for 't-shirt'", () => {
    products.searchTshirt();
    cy.contains("Searched Products").should("be.visible");
    products
      .getGrid()
      .find(".col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  });

  it("shows zero results for a non-existing product", () => {
    products.searchInvalid();
    cy.contains("Searched Products").should("be.visible");
    products.getGrid().find(".col-sm-4:visible").should("have.length", 0);
  });
});
