// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../pages/homePage";
import { ContactUsPage } from "../../pages/contactUsPage";

const home = new HomePage();
const contact = new ContactUsPage();

describe("Contact Us - Form submission", () => {
  it("fills and submits successfully using env credentials", () => {
    const name = Cypress.env("USER_NAME");
    const email = Cypress.env("USER_EMAIL");

    if (!name || !email) {
      throw new Error(
        "Missing credentials. Define USER_NAME and USER_EMAIL in cypress.env.json"
      );
    }

    // navigate via navbar (more realistic)
    home.visit();
    home.getNavMenuItem("Contact us").click();

    // ensure we are on the contact page
    cy.url().should("include", "/contact_us");

    // fill and submit (using env credentials)
    contact.fillForm({
      name,
      email,
      subject: "Automation Exercise - Contact",
      message: "Test message sent by Cypress.",
    });
    contact.submit();

    // validate success
    contact.assertSuccess();
  });
});
