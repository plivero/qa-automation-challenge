/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { ContactUsPage } from "../../../support/pages/contactUsPage";

const homePage = new HomePage();
const contactPage = new ContactUsPage();

describe("UI Platform - TC6: Contact Us", () => {
  it("submits the contact form successfully", () => {
    // Step 1–2: open home
    homePage.visit();

    // Step 3–4: go to Contact Us via navbar
    homePage.getNavMenuItem("Contact us").click();

    // Step 5: confirm Contact Us page loaded
    contactPage.getGetInTouchHeader().should("be.visible");

    // Step 6–8: fill + attach file + submit
    contactPage.fillAttachAndSubmitWithDefaults();

    // Step 10: success message visible
    contactPage.getSuccessMessage().should("be.visible");

    // Step 11: back to Home
    contactPage.goBackHomeAndVerify();
  });
});
