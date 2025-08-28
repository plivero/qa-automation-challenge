// cypress/e2e/specs/personalTests/tc10-subscription-home.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";

const home = new HomePage();

describe("UI Platform - TC10: Subscription (home footer)", () => {
  it("subscribes from the home page footer", () => {
    // Step 1–2: open site
    home.visit();

    // Step 3: home page visible
    home.getLogo().should("be.visible");

    // Step 4–6 (USER_EMAIL from env)
    home.subscribeFooterWithDefaults();

    // Step 7: success message visible
    home.getSubscriptionSuccessMessage().should("be.visible");
  });
});
