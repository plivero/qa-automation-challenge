// cypress/e2e/specs/personalTests/tc11-subscription-cart.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { CartPage } from "../../../support/pages/cartPage";

const home = new HomePage();
const cart = new CartPage();

describe("UI Platform - TC11: Subscription (cart footer)", () => {
  it("subscribes from the Cart page footer", () => {
    // Step 1–3: open home and verify logo
    home.visit();
    home.getLogo().should("be.visible");

    // Step 4–5: go to Cart page
    cart.visit();
    cy.url().should("include", "/view_cart");

    // Step 6–7: subscribe via footer (USER_EMAIL from env)
    home.subscribeFooterWithDefaults();

    // Step 8: success message visible
    home.getSubscriptionSuccessMessage().should("be.visible");
  });
});
