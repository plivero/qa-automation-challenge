// cypress/e2e/specs/personalTests/contact.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { ContactUsPage } from "../../../support/pages/contactUsPage";

const home = new HomePage();
const contact = new ContactUsPage();

describe("Contact Us - Form submission", () => {
  it("fills and submits successfully using env credentials", () => {
    home.visit();
    home.getNavMenuItem("Contact us").click();

    cy.url().should("include", "/contact_us");

    // only high-level action
    contact.fillAndSubmitWithDefaults();

    // assertion
    contact.getSuccessMessage().should("be.visible");
  });
});
