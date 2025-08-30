/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { SignupPage } from "../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";

const home = new HomePage();
const signup = new SignupPage();
const account = new AccountInfoPage();
const status = new AccountStatusPage();
const products = new ProductsPage();
const cart = new CartPage();
const checkout = new CheckoutPage();
const payment = new PaymentPage();

describe("UI Platform - TC15: Place Order (register before checkout)", () => {
  it("registers first, then places an order", () => {
    // Step 1: open home
    home.visit();

    // Step 2: go to Signup / Login
    home.getNavMenuItem("Signup / Login").click();

    // Step 3: 'New User Signup!' visible and start signup (faker inside PO)
    signup.getNewUserHeader().should("be.visible");
    const { name } = signup.startNewSignup(); // returns { name, email }

    // Step 4: fill account info (faker) and create account
    account.getEnterAccountInfoHeader().should("be.visible");
    account.fillAllFields();
    account.clickCreateAccount();

    // Step 5: 'ACCOUNT CREATED!' -> Continue
    status.getAccountCreatedMessage().should("be.visible");
    status.clickContinue();

    // Step 6: 'Logged in as <name>'
    status.getLoggedInLabel().should("contain.text", name);

    // Step 7: open All Products and add first product
    products.visit();
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");
    products.addFirstItemToCart();
    products.getAddedModal().should("be.visible");

    // Step 8: open cart from modal
    products.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 9: proceed to checkout
    cart.proceedToCheckout();

    // Step 10: checkout headers
    checkout.getAddressDetailsHeader().should("be.visible");
    checkout.getReviewYourOrderHeader().should("be.visible");

    // Step 11: add comment and place order
    checkout.addOrderComment("Please deliver ASAP.");
    checkout.clickPlaceOrder();

    // Step 12: payment with test card (keeps spec clean)
    payment.payWithTestCard();

    // Step 13: success message
    payment.getOrderPlacedMessage().should("be.visible");

    // Step 14: delete account and confirm
    status.clickDeleteAccount();
    status.getAccountDeletedMessage().should("be.visible");
    status.clickContinue();
  });
});
