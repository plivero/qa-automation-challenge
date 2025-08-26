// cypress/e2e/specs/personalTests/checkout-flow.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { LoginPage } from "../../../support/pages/loginPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";

const products = new ProductsPage();
const cart = new CartPage();
const login = new LoginPage();
const checkout = new CheckoutPage();
const payment = new PaymentPage();

describe("Checkout Flow", () => {
  describe("Guest Checkout", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
    });

    it("redirects guest to Login when proceeding to checkout", () => {
      products.visit();
      products.addFirstItemToCart();
      products.getAddedModal().should("be.visible");
      products.openCartFromModal();

      cy.url().should("include", "/view_cart");
      cart.getHeader().should("be.visible");
      cart.getVisibleRows().its("length").should("be.gte", 1);

      cart.proceedToCheckout();

      cy.contains("a", /Register \/ Login/i)
        .should("be.visible")
        .click();
      cy.url().should("include", "/login");
      login.getLoginPageHeader().should("be.visible");
    });
  });

  describe("Logged-in Checkout", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();

      login.visit();
      cy.url().should("include", "/login");
      login.getLoginPageHeader().should("be.visible");
      login.loginWith(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
      login.getLoggedInLabel().should("be.visible");
    });

    it("completes checkout and shows success message", () => {
      products.visit();
      products.addFirstItemToCart();
      products.getAddedModal().should("be.visible");
      products.openCartFromModal();

      cy.url().should("include", "/view_cart");
      cart.getHeader().should("be.visible");
      cart.getVisibleRows().its("length").should("be.gte", 1);

      cart.proceedToCheckout();

      // optional comment (action encapsulated CheckoutPage)
      checkout.addOrderComment("Automated test order.");
      checkout.getCheckoutContainer().should("be.visible");

      checkout.clickPlaceOrder();

      payment.getPaymentContainer().should("be.visible");
      payment.payWithDefaults();

      // success
      checkout.getOrderSuccessMessage().should("be.visible");
    });
  });
});
