// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { SignupPage } from "../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";

const products = new ProductsPage();
const cart = new CartPage();
const signup = new SignupPage();
const account = new AccountInfoPage();
const status = new AccountStatusPage();
const checkout = new CheckoutPage();
const payment = new PaymentPage();

describe("UI Platform - TC14: Place Order (register during checkout)", () => {
  it("completes order after registering at checkout", () => {
    // Step 1: open All Products
    products.visit();
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");

    // Step 2: add first product
    products.addFirstItemToCart();
    products.getAddedModal().should("be.visible");

    // Step 3: go to cart
    products.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 4: proceed to checkout (this opens the modal)
    cart.proceedToCheckout();

    // Step 5: in modal, click "Register / Login"
    cart.clickRegisterFromCheckoutModal();

    // Step 6: New User Signup header visible and start signup (faker inside PO)
    signup.getNewUserHeader().should("be.visible");
    const { name } = signup.startNewSignup(); // returns { name, email }

    // Step 7: fill account info and create account
    account.getEnterAccountInfoHeader().should("be.visible");
    account.fillAllFields(); // faker for address etc.
    account.clickCreateAccount();

    // Step 8: 'ACCOUNT CREATED!' then Continue
    status.getAccountCreatedMessage().should("be.visible");
    status.clickContinue();

    // Step 9: 'Logged in as <name>'
    status.getLoggedInLabel().should("contain.text", name);

    // Step 10: back to cart and proceed again
    cart.visit();
    cy.url().should("include", "/view_cart");
    cart.proceedToCheckout();

    // Step 11: checkout headers
    checkout.getAddressDetailsHeader().should("be.visible");
    checkout.getReviewYourOrderHeader().should("be.visible");

    // Step 12: optional comment + place order
    checkout.addOrderComment("Please deliver ASAP.");
    checkout.clickPlaceOrder();

    // Step 13: payment (use test card inside PO)
    payment.payWithTestCard();

    // Step 14: success message
    payment.getOrderPlacedMessage().should("be.visible");

    // Step 15: delete account
    status.clickDeleteAccount();
    status.getAccountDeletedMessage().should("be.visible");
    status.clickContinue();
  });
});
