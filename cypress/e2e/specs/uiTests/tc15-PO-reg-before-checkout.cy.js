/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { SignupPage } from "../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";

const homePage = new HomePage();
const signupPage = new SignupPage();
const infoPage = new AccountInfoPage();
const statusPage = new AccountStatusPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const paymentPage = new PaymentPage();

describe("UI Platform - TC15: Place Order (register before checkout)", () => {
  it("registers first, then places an order", () => {
    // Step 1: open home
    homePage.visit();

    // Step 2: go to Signup / Login
    homePage.getNavMenuItem("Signup / Login").click();

    // Step 3: 'New User Signup!' visible and start signup (faker inside PO)
    signupPage.getNewUserHeader().should("be.visible");
    const { name } = signupPage.startNewSignup(); // returns { name, email }

    // Step 4: fill account info (faker) and create account
    infoPage.getAccountInfoHeader().should("be.visible");
    infoPage.fillAllFields();
    infoPage.clickCreateAccount();

    // Step 5: 'ACCOUNT CREATED!' -> Continue
    statusPage.getAccountCreatedMessage().should("be.visible");
    statusPage.clickContinue();

    // Step 6: 'Logged in as <name>'
    statusPage.getLoggedInLabel().should("contain.text", name);

    // Step 7: open All Products and add first product
    productsPage.visit();
    productsPage.getTitle().should("be.visible");
    productsPage.getGrid().should("exist");
    productsPage.addFirstItemToCart();
    productsPage.getAddedModal().should("be.visible");

    // Step 8: open cart from modal
    productsPage.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 9: proceed to checkout
    cartPage.proceedToCheckout();

    // Step 10: checkout headers
    checkoutPage.getAddressDetailsHeader().should("be.visible");
    checkoutPage.getReviewYourOrderHeader().should("be.visible");

    // Step 11: add comment and place order
    checkoutPage.addOrderComment("Please deliver ASAP.");
    checkoutPage.clickPlaceOrder();

    // Step 12: payment with test card (keeps spec clean)
    paymentPage.payWithTestCard();

    // Step 13: success message
    paymentPage.getOrderPlacedMessage().should("be.visible");

    // Step 14: delete account and confirm
    statusPage.clickDeleteAccount();
    statusPage.getAccountDeletedMessage().should("be.visible");
    statusPage.clickContinue();
  });
});
