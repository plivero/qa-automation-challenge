/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";
import { SignupPage } from "../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { CheckoutPage } from "../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../support/pages/paymentPage";

const homePage = new HomePage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const signupPage = new SignupPage();
const infoPage = new AccountInfoPage();
const statusPage = new AccountStatusPage();
const checkoutPage = new CheckoutPage();
const paymentPage = new PaymentPage();

describe("UI Platform - TC24: Download Invoice after purchase order", () => {
  it("completes order and downloads invoice", () => {
    // Step 1–2: baseUrl
    homePage.visit();

    // Step 3: home
    homePage.getLogo().should("be.visible");

    // Step 4: add products to cart
    productsPage.visit();
    productsPage.addFirstItemToCart();

    // Step 5: click 'Cart'
    productsPage.clickContinueShoppingInModal();
    homePage.getNavMenuItem("Cart").click();

    // Step 6: confirm cart
    cy.url().should("include", "/view_cart");

    // Step 7: 'Proceed To Checkout'
    cartPage.proceedToCheckout();

    // Step 8: click 'Register/Login' and go to login
    cartPage.clickRegisterLoginOnModal();

    // Step 9: fill register and create account (PO usa faker/env)
    signupPage.getNewUserHeader().should("be.visible");
    const { name } = signupPage.startNewSignup();
    infoPage.getAccountInfoHeader().should("be.visible");
    infoPage.fillAllFields();
    infoPage.clickCreateAccount();

    // Step 10: 'ACCOUNT CREATED!' and'Continue'
    statusPage.getAccountCreatedMessage().should("be.visible");
    statusPage.clickContinue();

    // Step 11: 'Logged in as username'
    statusPage.getLoggedInLabel().should("contain.text", name);

    // Step 12: click 'Cart' (navbar)
    homePage.getNavMenuItem("Cart").click();

    // Step 13: click 'Proceed To Checkout'
    cartPage.proceedToCheckout();

    // Step 14: verify 'Address Details' and 'Review Your Order'
    checkoutPage.getAddressDetailsHeader().should("be.visible");
    checkoutPage.getReviewYourOrderHeader().should("be.visible");

    // Step 15: write comment and click 'Place Order'
    checkoutPage.addOrderComment("Please deliver ASAP.");
    checkoutPage.clickPlaceOrder();

    // Step 16: payment
    paymentPage.payWithTestCard();

    // Step 17: 'Pay and Confirm Order'

    // Step 18: confirm
    paymentPage.getOrderPlacedMessage().should("be.visible");

    // Step 19: click Download invoice
    paymentPage.getDownloadInvoiceButton().should("be.visible");
    paymentPage.clickDownloadInvoiceButton();

    // Step 20: continue
    cy.contains(/Continue/i).click();

    // Step 21: 'Delete Account'
    statusPage.clickDeleteAccount();

    // Step 22: 'ACCOUNT DELETED!' and 'Continue'
    statusPage.getAccountDeletedMessage().should("be.visible");
    statusPage.clickContinue();
  });
});
