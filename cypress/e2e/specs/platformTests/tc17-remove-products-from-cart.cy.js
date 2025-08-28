// cypress/e2e/specs/personalTests/tc17-remove-product-from-cart.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("UI Platform - TC17: Remove product from cart", () => {
  it("adds a product, opens cart, removes it and verifies it's gone", () => {
    // Step 1: open All Products
    products.visit();

    // Step 2: add first product
    products.addFirstItemToCart();
    products.getAddedModal().should("be.visible");

    // Step 3: go to cart
    products.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 4: ensure we have at least 1 row
    cart.getVisibleRows().should("have.length.greaterThan", 0);

    // Step 5: remove first item
    cart.removeFirstItem();

    // Step 6: verify cart is empty (no visible rows)
    cart.getVisibleRows().should("have.length", 0);
  });
});
