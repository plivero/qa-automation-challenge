// cypress/e2e/specs/personalTests/cart-quantity.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { ProductDetailsPage } from "../../../support/pages/productDetailsPage";
import { CartPage } from "../../../support/pages/cartPage";

const products = new ProductsPage();
const details = new ProductDetailsPage();
const cart = new CartPage();

describe("Cart - Change quantity (via details)", () => {
  it("sets quantity=3 in details, adds to cart and validates in cart", () => {
    // 1) products list
    products.visit();
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");

    // 2) open first product details
    cy.get(".product-image-wrapper").first().contains("View Product").click();

    // 3) set qty=3 and add to cart
    details.setQuantity(3);
    details.addToCartFromDetails();
    details.getAddedModal().should("be.visible");
    details.openCartFromModal();

    // 4) validate in cart
    cy.url().should("include", "/view_cart");
    cart.getHeader().should("be.visible");
    cart.getFirstItemQuantityCell().should("contain.text", "3");
  });
});
