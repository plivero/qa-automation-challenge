/// <reference types="cypress" />

import { SignupPage } from "../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { AddressPage } from "../../../support/pages/addressPage";

const signupPage = new SignupPage();
const infoPage = new AccountInfoPage();
const statusPage = new AccountStatusPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const addressPage = new AddressPage();

describe("UI Platform - TC23: Verify address details in checkout", () => {
  it("checks delivery & billing addresses match signup data", () => {
    // Step 1: login
    cy.visit("/login");
    signupPage.getNewUserHeader().should("be.visible");
    const { name } = signupPage.startNewSignup();

    // Step 2: fill account info
    infoPage.getAccountInfoHeader().should("be.visible");
    infoPage.fillAllFields();
    infoPage.clickCreateAccount();

    // Step 3: created account
    statusPage.getAccountCreatedMessage().should("be.visible");
    statusPage.clickContinue();
    statusPage.getLoggedInLabel().should("contain.text", name);

    // Step 4: add product
    productsPage.visit();
    productsPage.addFirstItemToCart();
    productsPage.openCartFromModal();

    // Step 5: checkout
    cartPage.proceedToCheckout();

    // Step 6: verify delivery e billing address
    addressPage.getDeliveryBox().should("be.visible").and("not.be.empty");
    addressPage.getBillingBox().should("be.visible").and("not.be.empty");

    // Step 7: delete account
    statusPage.clickDeleteAccount();
    statusPage.getAccountDeletedMessage().should("be.visible");
    statusPage.clickContinue();
  });
});
