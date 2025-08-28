// cypress/e2e/specs/personalTests/checkout-flow.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { LoginPage } from "../../../support/pages/loginPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";
import { buildAccountPayload } from "../../../support/factories/userFactory";

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

      // --- Ensure user exists (tiny precondition) ---
      const email = Cypress.env("USER_EMAIL");
      const password = Cypress.env("USER_PASSWORD");

      // 1) try verifyLogin
      cy.request({
        method: "POST",
        url: "/api/verifyLogin",
        form: true,
        body: { email, password },
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        const data = JSON.parse(body);
        const ok = status === 200 && data.message === "User exists!";

        if (!ok) {
          // 2) create account with the same email/password from env
          const payload = buildAccountPayload({ email, password });
          cy.request({
            method: "POST",
            url: "/api/createAccount",
            form: true,
            body: payload,
            failOnStatusCode: false,
          });
        }
      });

      // 3) go to login page and log in
      login.visit();
      cy.url().should("include", "/login");
      login.getLoginPageHeader().should("be.visible");
      login.loginWith(email, password);
      // "Logged in as" checado na navbar
      cy.contains(/Logged in as/i).should("be.visible");
    });

    it("completes checkout and shows success message", () => {
      // actions
      products.visit();
      products.addFirstItemToCart();
      products.getAddedModal().should("be.visible");
      products.openCartFromModal();

      // asserts cart
      cy.url().should("include", "/view_cart");
      cart.getHeader().should("be.visible");
      cart.getVisibleRows().its("length").should("be.gte", 1);

      // checkout
      cart.proceedToCheckout();
      checkout.addOrderComment("Automated test order.");
      checkout.getCheckoutContainer().should("be.visible");
      checkout.clickPlaceOrder();

      // pay
      payment.getPaymentContainer().should("be.visible");
      payment.payWithDefaults();

      // success
      checkout.getOrderSuccessMessage().should("be.visible");
    });
  });
});
