/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";

const productsPage = new ProductsPage();
const cartPage = new CartPage();

describe("UI Platform - TC17: Remove product from cart", () => {
  it("adds a product, opens cart, removes it and verifies it's gone", () => {
    // Step 1: open All Products
    productsPage.visit();

    // Step 2: add first product
    productsPage.addFirstItemToCart();
    productsPage.getAddedModal().should("be.visible");

    // Step 3: go to cart
    productsPage.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 4: ensure we have at least 1 row
    cartPage.getVisibleRows().should("have.length.greaterThan", 0);

    // Step 5: remove first item
    cartPage.removeFirstItem();

    // Step 6: verify cart is empty (no visible rows)
    cartPage.getVisibleRows().should("have.length", 0);
  });
});
