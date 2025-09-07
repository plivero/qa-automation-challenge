/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";

const homePage = new HomePage();

describe("UI Platform - TC10: Subscription (home footer)", () => {
  it("subscribes from the home page footer", () => {
    // Step 1–2: open site
    homePage.visit();

    // Step 3: home page visible
    homePage.getLogo().should("be.visible");

    // Step 4–6 (USER_EMAIL from env)
    homePage.subscribeFooterWithDefaults();

    // Step 7: success message visible
    cy.contains(/you have been successfully subscribed!/i).should("be.visible");
  });
});
