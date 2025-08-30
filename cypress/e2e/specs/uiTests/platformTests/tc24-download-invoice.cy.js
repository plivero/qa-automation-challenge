/// <reference types="cypress" />

import { HomePage } from "../../../../support/pages/homePage";
import { ProductsPage } from "../../../../support/pages/productsPage";
import { CartPage } from "../../../../support/pages/cartPage";
import { SignupPage } from "../../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../../support/pages/accountStatusPage";
import { CheckoutPage } from "../../../../support/pages/checkoutPage";
import { PaymentPage } from "../../../../support/pages/paymentPage";

const home = new HomePage();
const products = new ProductsPage();
const cart = new CartPage();
const signup = new SignupPage();
const account = new AccountInfoPage();
const status = new AccountStatusPage();
const checkout = new CheckoutPage();
const payment = new PaymentPage();

describe("UI Platform - TC24: Download Invoice after purchase order", () => {
  it("completes order and downloads invoice", () => {
    // Step 1–2: abrir site (baseUrl)
    home.visit();

    // Step 3: home visível
    home.getLogo().should("be.visible");

    // Step 4: adicionar produto ao carrinho (primeiro item)
    products.visit();
    products.addFirstItemToCart();

    // Step 5: clicar no botão 'Cart' (navbar)
    products.clickContinueShoppingInModal();
    home.getNavMenuItem("Cart").click();

    // Step 6: confirmar que estamos no carrinho
    cy.url().should("include", "/view_cart");

    // Step 7: clicar em 'Proceed To Checkout'
    cart.proceedToCheckout();

    // Step 8: clicar em 'Register / Login' (modal) e ir para /login
    cart.clickRegisterLoginOnModal();

    // Step 9: preencher cadastro e criar conta (PO usa faker/env)
    signup.getNewUserHeader().should("be.visible");
    const { name } = signup.startNewSignup();
    account.getEnterAccountInfoHeader().should("be.visible");
    account.fillAllFields();
    account.clickCreateAccount();

    // Step 10: 'ACCOUNT CREATED!' e clicar 'Continue'
    status.getAccountCreatedMessage().should("be.visible");
    status.clickContinue();

    // Step 11: 'Logged in as username'
    status.getLoggedInLabel().should("contain.text", name);

    // Step 12: clicar 'Cart' (navbar)
    home.getNavMenuItem("Cart").click();

    // Step 13: clicar 'Proceed To Checkout'
    cart.proceedToCheckout();

    // Step 14: verificar 'Address Details' e 'Review Your Order'
    checkout.getAddressDetailsHeader().should("be.visible");
    checkout.getReviewYourOrderHeader().should("be.visible");

    // Step 15: escrever comentário e clicar 'Place Order'
    checkout.addOrderComment("Please deliver ASAP.");
    checkout.clickPlaceOrder();

    // Step 16: preencher pagamento (helper simples)
    payment.payWithTestCard();

    // Step 17: clicar 'Pay and Confirm Order' (já feito dentro do helper)

    // Step 18: confirmar sucesso do pedido
    payment.getOrderPlacedMessage().should("be.visible");

    // Step 19: clicar 'Download Invoice' (checar botão e clicar)
    payment.getDownloadInvoiceButton().should("be.visible");
    payment.clickDownloadInvoiceButton();

    // Step 20: clicar 'Continue'
    cy.contains(/Continue/i).click();

    // Step 21: clicar 'Delete Account'
    status.clickDeleteAccount();

    // Step 22: 'ACCOUNT DELETED!' e 'Continue'
    status.getAccountDeletedMessage().should("be.visible");
    status.clickContinue();
  });
});
