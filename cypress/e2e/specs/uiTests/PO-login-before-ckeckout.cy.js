/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";
import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { ensureUserViaApi } from "../../../support/helpers/userApi";

const homePage = new HomePage();
const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const paymentPage = new PaymentPage();
const statusPage = new AccountStatusPage();

before(() => {
  ensureUserViaApi();
});

describe("UI Platform - TC16: Place Order (login before checkout)", () => {
  it("logs in first, then places an order", () => {
    // Step 1: open home
    homePage.visit();

    // Step 2: go to Signup / Login
    homePage.getNavMenuItem("Signup / Login").click();

    // Step 3: login with env credentials
    loginPage.getLoginPageHeader().should("be.visible");
    loginPage.loginWithValid();

    // Step 4: 'Logged in as' visible
    statusPage.getLoggedInLabel().should("be.visible");

    // Step 5: open All Products and add first product
    productsPage.visit();
    productsPage.getTitle().should("be.visible");
    productsPage.getGrid().should("exist");
    productsPage.addFirstItemToCart();
    productsPage.getAddedModal().should("be.visible");

    // Step 6: open cart from modal
    productsPage.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 7: proceed to checkout
    cartPage.proceedToCheckout();

    // Step 8: checkout headers
    checkoutPage.getAddressDetailsHeader().should("be.visible");
    checkoutPage.getReviewYourOrderHeader().should("be.visible");

    // Step 9: add comment and place order
    checkoutPage.addOrderComment("Please deliver ASAP.");
    checkoutPage.clickPlaceOrder();

    // Step 10: payment with test card
    paymentPage.payWithTestCard();

    // Step 11: success message
    paymentPage.getOrderPlacedMessage().should("be.visible");

    // Step 12: delete account and confirm
    statusPage.clickDeleteAccount();
    statusPage.getAccountDeletedMessage().should("be.visible");
    statusPage.clickContinue();
  });
});
