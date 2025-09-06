/// <reference types="cypress" />

import { ProductDetailsPage } from "../../../support/pages/productDetailsPage";
import { CartPage } from "../../../support/pages/cartPage";

const detailsPage = new ProductDetailsPage();
const cartPage = new CartPage();

describe("UI Platform - TC13: Verify Product quantity in Cart", () => {
  it("adds a product with quantity 4 and verifies it in cart", () => {
    // Step 1: open All Products page
    cy.visit("/products");

    // Step 2: open the first product details
    cy.get(".product-image-wrapper").first().contains("View Product").click();

    // Step 3: ensure details block is visible
    cy.get(".product-information").should("be.visible");

    // Step 4: set quantity = 4
    detailsPage.setQuantity(4);

    // Step 5: add to cart from details
    detailsPage.addToCartFromDetails();

    // Step 6: confirm 'Added!' modal and go to cart
    detailsPage.getAddedModal().should("be.visible");
    detailsPage.openCartFromModal();

    // Step 7: verify we are on cart page and quantity is 4
    cy.url().should("include", "/view_cart");
    cartPage.getFirstItemQuantityCell().should("contain.text", "4");
  });
});
