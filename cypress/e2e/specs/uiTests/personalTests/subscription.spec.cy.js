/// <reference types="cypress" />

import { HomePage } from "../../../../support/pages/homePage";

const home = new HomePage();

describe("Footer Subscription", () => {
  it("submits an email and shows success message", () => {
    home.visit();

    // apenas chamando método encapsulado
    home.subscribeFooterWithDefaults();

    home.getSubscriptionSuccessMessage().should("be.visible");
  });
});
