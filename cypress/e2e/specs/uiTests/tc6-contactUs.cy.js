/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { ContactUsPage } from "../../../support/pages/contactUsPage";

const home = new HomePage();
const contact = new ContactUsPage();

describe("UI Platform - TC6: Contact Us", () => {
  it("submits the contact form successfully", () => {
    // Step 1–2: open home
    home.visit();

    // Step 3–4: go to Contact Us via navbar
    home.getNavMenuItem("Contact us").click();

    // Step 5: confirm Contact Us page loaded
    contact.getGetInTouchHeader().should("be.visible");

    // Step 6–8: fill + attach file + submit
    contact.fillAttachAndSubmitWithDefaults();

    // Step 10: success message visible
    contact.getSuccessMessage().should("be.visible");

    // Step 11: back to Home
    contact.goBackHomeAndVerify();
  });
});
