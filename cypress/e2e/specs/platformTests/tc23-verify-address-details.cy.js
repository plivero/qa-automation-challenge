// @ts-check
/// <reference types="cypress" />

import { SignupPage } from "../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { AddressPage } from "../../../support/pages/addressPage";

const signup = new SignupPage();
const info = new AccountInfoPage();
const status = new AccountStatusPage();
const products = new ProductsPage();
const cart = new CartPage();
const address = new AddressPage();

describe("UI Platform - TC23: Verify address details in checkout", () => {
  it("checks delivery & billing addresses match signup data", () => {
    // Step 1: login
    cy.visit("/login");
    signup.getNewUserHeader().should("be.visible");
    const { name, email } = signup.startNewSignup();

    // Step 2: fill account info
    info.getEnterAccountInfoHeader().should("be.visible");
    info.fillAllFields();
    info.clickCreateAccount();

    // Step 3: created account
    status.getAccountCreatedMessage().should("be.visible");
    status.clickContinue();
    status.getLoggedInLabel().should("contain.text", name);

    // Step 4: add product
    products.visit();
    products.addFirstItemToCart();
    products.openCartFromModal();

    // Step 5: checkout
    cart.proceedToCheckout();

    // Step 6: verify delivery e billing address
    address.getDeliveryBox().should("be.visible").and("not.be.empty");
    address.getBillingBox().should("be.visible").and("not.be.empty");

    // Step 7: delete account
    status.clickDeleteAccount();
    status.getAccountDeletedMessage().should("be.visible");
    status.clickContinue();
  });
});
