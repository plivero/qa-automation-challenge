// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../pages/homePage";

const home = new HomePage();

describe("Footer Subscription", () => {
  it("submits an email and shows success message", () => {
    home.visit();

    const email = Cypress.env("USER_EMAIL");
    home.subscribeFooter(email);

    home.assertSubscriptionSuccess();
  });
});
