// cypress/e2e/specs/personalTests/cart-remove-item.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Cart - Remove item", () => {
  it("adds an item and then removes it from the cart", () => {
    // add an item
    products.visit();
    products.addFirstItemToCart();
    products.getAddedModal().should("be.visible");
    products.openCartFromModal();

    // cart page visible
    cy.url().should("include", "/view_cart");
    cart.getHeader().should("be.visible");

    // has at least 1 row
    cart.getVisibleRows().its("length").should("be.gte", 1);

    // remove first item
    cart.removeFirstItem();

    // empty: zero visible rows
    cart.getVisibleRows().should("have.length", 0);
  });
});
