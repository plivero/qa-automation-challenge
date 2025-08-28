// cypress/e2e/specs/personalTests/tc20-search-products-persist-cart.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { LoginPage } from "../../../support/pages/loginPage";
import { HomePage } from "../../../support/pages/homePage";

const products = new ProductsPage();
const cart = new CartPage();
const login = new LoginPage();
const home = new HomePage();

describe("UI Platform - TC20: Search products and verify cart after login", () => {
  it("keeps searched items in cart after logging in", () => {
    const term = Cypress.env("SEARCH_TERM") || "dress";

    // Step 1: open products
    products.visit();
    products.getTitle().should("be.visible");

    // Step 2: search term
    products.search(term);
    cy.contains(/Searched Products/i).should("be.visible");

    // Step 3: ensure results
    products.getGrid().should("exist");

    // Step 4: add first item
    products.addFirstItemToCart();
    products.getAddedModal().should("be.visible");

    // Step 5: go to cart
    products.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 6: assert item visible in cart
    cart.getVisibleRows().should("have.length.greaterThan", 0);

    // Step 7: go to login
    home.getNavMenuItem("Signup / Login").click();
    login.getLoginPageHeader().should("be.visible");
    login.loginWithValid();

    // Step 8: open cart again
    cart.visit();
    cart.getVisibleRows().should("have.length.greaterThan", 0);
  });
});
