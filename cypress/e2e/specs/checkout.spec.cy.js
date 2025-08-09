// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../pages/productsPage";
import { CartPage } from "../pages/cartPage";
import { LoginPage } from "../pages/loginPage";

const products = new ProductsPage();
const cart = new CartPage();
const login = new LoginPage();

describe("Checkout Flow", () => {
  describe("Guest Checkout", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
    });

    it("redirects guest to Login when proceeding to checkout", () => {
      // add item
      products.visit();
      products.addFirstItemToCart();
      products.openCartFromModal();

      // checkout
      cart.assertLoaded();
      cart.assertHasItems(1);
      cart.proceedToCheckout(); // click with {force: true} no POM

      // a página mostra um LINK "Register / Login" -> clique nele
      cy.contains("a", /Register \/ Login/i)
        .should("be.visible")
        .click();

      // agora sim estamos na tela de login
      login.assertOnLoginPage();
    });
  });

  describe("Logged-in Checkout", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();

      // login usando suas credenciais do cypress.env.json
      login.visit();
      login.assertOnLoginPage();
      // use o método existente (não existe fillLogin)
      login.loginWith(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
      login.assertLoginSuccess();
    });

    it("completes checkout and shows success message", () => {
      // add item
      products.visit();
      products.addFirstItemToCart();
      products.openCartFromModal();

      // checkout
      cart.assertLoaded();
      cart.assertHasItems(1);
      cart.proceedToCheckout();

      // opcional: comentário
      cy.get('textarea[name="message"]').type("Pedido de teste automatizado.");

      // place order
      cy.contains(/place order/i).click();

      // pagamento (campos da página de pagamento)
      cy.get('[data-qa="name-on-card"]').type(
        Cypress.env("USER_NAME") || "QA User"
      );
      cy.get('[data-qa="card-number"]').type("4111111111111111");
      cy.get('[data-qa="cvc"]').type("123");
      cy.get('[data-qa="expiry-month"]').type("12");
      cy.get('[data-qa="expiry-year"]').type("2030");
      cy.contains(/pay and confirm order/i).click();

      // sucesso
      cy.contains(/order has been confirmed/i, { timeout: 10000 }).should(
        "be.visible"
      );
    });
  });
});
