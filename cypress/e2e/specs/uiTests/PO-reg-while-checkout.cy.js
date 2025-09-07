/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { SignupPage } from "../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const signupPage = new SignupPage();
const infoPage = new AccountInfoPage();
const statusPage = new AccountStatusPage();
const checkoutPage = new CheckoutPage();
const paymentPage = new PaymentPage();

describe("UI Platform - TC14: Place Order (register during checkout)", () => {
  it("completes order after registering at checkout", () => {
    // Step 1: open All Products
    productsPage.visit();
    productsPage.getTitle().should("be.visible");
    productsPage.getGrid().should("exist");

    // Step 2: add first product
    productsPage.addFirstItemToCart();
    productsPage.getAddedModal().should("be.visible");

    // Step 3: go to cart
    productsPage.openCartFromModal();
    cy.url().should("include", "/view_cart");
    cartPage.getVisibleRows().its("length").should("be.gte", 1);

    // Step 4: proceed to checkout (this opens the modal)
    cartPage.proceedToCheckout();

    // Step 5: in modal, click "Register / Login"
    cartPage.clickRegisterFromCheckoutModal();

    // Step 6: New User Signup header visible and start signup (faker inside PO)
    signupPage.getNewUserHeader().should("be.visible");
    const { name } = signupPage.startNewSignup(); // returns { name, email }

    // Step 7: fill account info and create account
    infoPage.getAccountInfoHeader().should("be.visible");
    infoPage.fillAllFields(); // faker for address etc.
    infoPage.clickCreateAccount();

    // Step 8: 'ACCOUNT CREATED!' then Continue
    statusPage.getAccountCreatedMessage().should("be.visible");
    statusPage.clickContinue();

    // Step 9: 'Logged in as <name>'
    statusPage.getLoggedInLabel().should("contain.text", name);

    // Step 10: back to cart and proceed again
    cartPage.visit();
    cy.url().should("include", "/view_cart");
    cartPage.proceedToCheckout();

    // Step 11: checkout headers
    checkoutPage.getAddressDetailsHeader().should("be.visible");
    checkoutPage.getReviewYourOrderHeader().should("be.visible");

    // Step 12: optional comment + place order
    checkoutPage.addOrderComment("Please deliver ASAP.");
    checkoutPage.clickPlaceOrder();

    // Step 13: payment (use test card inside PO)
    paymentPage.payWithTestCard();
    paymentPage.clickPayBtn();

    // Step 14: success message
    paymentPage.getOrderPlacedMessage().should("be.visible");

    // Step 15: delete account
    statusPage.clickDeleteAccount();
    statusPage.getAccountDeletedMessage().should("be.visible");
    statusPage.clickContinue();
  });
});
