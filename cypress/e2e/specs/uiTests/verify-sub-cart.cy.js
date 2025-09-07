/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { CartPage } from "../../../support/pages/cartPage";

const homePage = new HomePage();
const cartPage = new CartPage();

describe("UI Platform - TC11: Subscription (cart footer)", () => {
  it("subscribes from the Cart page footer", () => {
    // Step 1–3: open home and verify logo
    homePage.visit();
    homePage.getLogo().should("be.visible");

    // Step 4–5: go to Cart page
    cartPage.visit();
    cy.url().should("include", "/view_cart");

    // Step 6–7: subscribe via footer (USER_EMAIL from env)
    homePage.subscribeFooterWithDefaults();

    // Step 8: success message visible
    cy.contains(/you have been successfully subscribed!/i).should("be.visible");
  });
});
