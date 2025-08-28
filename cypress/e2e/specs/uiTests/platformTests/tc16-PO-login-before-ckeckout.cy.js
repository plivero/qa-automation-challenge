/// <reference types="cypress" />

import { HomePage } from "../../../../support/pages/homePage";
import { LoginPage } from "../../../../support/pages/loginPage";
import { ProductsPage } from "../../../../support/pages/productsPage";
import { CartPage } from "../../../../support/pages/cartPage";
import { CheckoutPage } from "../../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../../support/pages/paymentPage";
import { AccountStatusPage } from "../../../../support/pages/accountStatusPage";

const home = new HomePage();
const login = new LoginPage();
const products = new ProductsPage();
const cart = new CartPage();
const checkout = new CheckoutPage();
const payment = new PaymentPage();
const status = new AccountStatusPage();

describe("UI Platform - TC16: Place Order (login before checkout)", () => {
  it("logs in first, then places an order", () => {
    // Step 1: open home
    home.visit();

    // Step 2: go to Signup / Login
    home.getNavMenuItem("Signup / Login").click();

    // Step 3: login with env credentials
    login.getLoginPageHeader().should("be.visible");
    login.loginWithValid();

    // Step 4: 'Logged in as' visible
    status.getLoggedInLabel().should("be.visible");

    // Step 5: open All Products and add first product
    products.visit();
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");
    products.addFirstItemToCart();
    products.getAddedModal().should("be.visible");

    // Step 6: open cart from modal
    products.openCartFromModal();
    cy.url().should("include", "/view_cart");

    // Step 7: proceed to checkout
    cart.proceedToCheckout();

    // Step 8: checkout headers
    checkout.getAddressDetailsHeader().should("be.visible");
    checkout.getReviewYourOrderHeader().should("be.visible");

    // Step 9: add comment and place order
    checkout.addOrderComment("Please deliver ASAP.");
    checkout.clickPlaceOrder();

    // Step 10: payment with test card
    payment.payWithTestCard();

    // Step 11: success message
    payment.getOrderPlacedMessage().should("be.visible");

    // Step 12: delete account and confirm
    status.clickDeleteAccount();
    status.getAccountDeletedMessage().should("be.visible");
    status.clickContinue();
  });
});
