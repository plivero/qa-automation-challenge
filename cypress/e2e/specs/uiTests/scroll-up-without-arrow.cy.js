/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";

const homePage = new HomePage();

describe("UI Platform - TC26: Scroll Down & manual Scroll Up (no arrow)", () => {
  it("scrolls to bottom, verifies 'SUBSCRIPTION', scrolls back to top without arrow", () => {
    // Step 1–2: open site
    homePage.visit();

    // Step 3: check home page logo
    homePage.getLogo().should("be.visible");

    // Step 4: scroll down
    homePage.scrollToBottom();

    // Step 5: check 'SUBSCRIPTION'
    cy.contains(/SUBSCRIPTION/i).should("be.visible");

    // Step 6: scroll up (no arrow click)
    homePage.scrollToTop();

    // Step 7: check hero text at top
    cy.contains(
      /Full-Fledged practice website for Automation Engineers/i
    ).should("be.visible");
  });
});
