/// <reference types="cypress" />

import { HomePage } from "../../../../support/pages/homePage";

const home = new HomePage();

describe("UI Platform - TC26: Scroll Down & manual Scroll Up (no arrow)", () => {
  it("scrolls to bottom, verifies 'SUBSCRIPTION', scrolls back to top without arrow", () => {
    // Step 1–2: open site
    home.visit();

    // Step 3: check home page logo
    home.getLogo().should("be.visible");

    // Step 4: scroll down
    cy.scrollTo("bottom");

    // Step 5: check 'SUBSCRIPTION'
    cy.contains(/SUBSCRIPTION/i).should("be.visible");

    // Step 6: scroll up (no arrow click)
    cy.scrollTo("top");

    // Step 7: check hero text at top
    home.getHeroText().should("be.visible");
  });
});
