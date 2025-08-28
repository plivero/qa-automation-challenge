/// <reference types="cypress" />

import { ProductsPage } from "../../../../support/pages/productsPage";
import { CartPage } from "../../../../support/pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Checkout - Smoke", () => {
  it("adds item and proceeds to checkout", () => {
    // actions
    products.visit();
    products.addFirstItemToCart();

    // assert: added modal visible
    products.getAddedModal().should("be.visible");

    // action: go to cart
    products.openCartFromModal();

    // asserts: on /view_cart and header visible
    cy.url().should("include", "/view_cart");
    cart.getHeader().should("be.visible");

    // assert: at least 1 visible row in cart
    cart.getVisibleRows().its("length").should("be.gte", 1);

    // action: proceed to checkout
    cart.proceedToCheckout();

    // assert: checkout/register markers visible
    cy.contains(/Address Details|Checkout|Register \/ Login/i).should(
      "be.visible"
    );
  });
});
