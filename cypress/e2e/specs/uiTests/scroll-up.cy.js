/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";

const homePage = new HomePage();

describe("UI Platform - TC25: Scroll Down & Arrow Scroll Up", () => {
  it("scrolls to bottom, verifies 'SUBSCRIPTION', uses arrow to scroll up", () => {
    // Step 1–2: open site
    homePage.visit();

    // Step 3: home visible
    homePage.getLogo().should("be.visible");

    // Step 4: scroll down
    homePage.scrollToBottom();

    // Step 5: check 'SUBSCRIPTION'
    homePage.getSubscriptionTitle().should("be.visible");

    // Step 6: click scroll up arrow
    homePage.clickScrollUpArrow();

    // Step 7: hero text visible again (means we are at the top)
    homePage.getHeroText().should("be.visible");
  });
});
