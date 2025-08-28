// cypress/e2e/specs/personalTests/tc25-scroll.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";

const home = new HomePage();

describe("UI Platform - TC25: Scroll Down & Arrow Scroll Up", () => {
  it("scrolls to bottom, verifies 'SUBSCRIPTION', uses arrow to scroll up", () => {
    // Step 1–2: open site
    home.visit();

    // Step 3: home visible
    home.getLogo().should("be.visible");

    // Step 4: scroll down
    cy.scrollTo("bottom");

    // Step 5: check 'SUBSCRIPTION'
    cy.contains(/SUBSCRIPTION/i).should("be.visible");

    // Step 6: click scroll up arrow
    cy.get("#scrollUp").click();

    // Step 7: hero text visible again (means we are at the top)
    home.getHeroText().should("be.visible");
  });
});
