/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { LoginPage } from "../../../support/pages/loginPage";
import { HomePage } from "../../../support/pages/homePage";

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const loginPage = new LoginPage();
const homePage = new HomePage();

describe("UI Platform - TC20: Search products and verify cart after login", () => {
  it("keeps searched items in cart after logging in", () => {
    const term = Cypress.env("SEARCH_TERM") || "dress";

    // Step 1: open products
    productsPage.visit();
    productsPage.getTitle().should("be.visible");

    // Step 2: search term
    productsPage.search(term);

    // Step 3: ensure results
    productsPage.getGrid().should("exist");

    // Step 4: add first item
    productsPage.addFirstItemToCart();
    productsPage.getAddedModal().should("be.visible");

    // Step 5: go to cart
    productsPage.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 6: assert item visible in cart
    cartPage.getVisibleRows().should("have.length.greaterThan", 0);

    // Step 7: go to login
    homePage.getNavSignupLogin().click();
    loginPage.getLoginPageHeader().should("be.visible");
    loginPage.loginWithValid();

    // Step 8: open cart again
    cartPage.visit();
    cartPage.getVisibleRows().should("have.length.greaterThan", 0);
  });
});
