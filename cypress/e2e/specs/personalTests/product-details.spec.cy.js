// cypress/e2e/specs/personalTests/product-details.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { ProductDetailsPage } from "../../../support/pages/productDetailsPage";

const products = new ProductsPage();
const productDetails = new ProductDetailsPage();

describe("Products - Product Details", () => {
  it("opens product details and validates the information", () => {
    // visit products
    products.visit();
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");

    // open first product
    cy.get(".product-image-wrapper").first().contains("View Product").click();

    // asserts on details
    productDetails.getDetailsContainer().should("be.visible");
    productDetails.getCategory().should("be.visible");
    productDetails.getPrice().should("be.visible");
    productDetails.getAvailability().should("be.visible");
    productDetails.getCondition().should("be.visible");
    productDetails.getBrand().should("be.visible");
  });
});
