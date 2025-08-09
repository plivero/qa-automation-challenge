// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../pages/homePage";

const home = new HomePage();

describe("Footer Subscription", () => {
  it("envia um e-mail e mostra mensagem de sucesso", () => {
    home.visit();

    const email = Cypress.env("USER_EMAIL");
    home.subscribeFooter(email);

    home.assertSubscriptionSuccess();
  });
});
