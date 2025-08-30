/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { SignupPage } from "../../../support/pages/signupPage";

const home = new HomePage();
const signup = new SignupPage();

describe("UI Platform - TC5: Register with existing email", () => {
  it("shows 'Email Address already exist!' error", () => {
    // Step 1: Launch browser (handled by Cypress)

    // Step 2: Open site (home)
    home.visit();

    // Step 3: Home visible (logo)
    home.getLogo().should("be.visible");

    // Step 4: Click 'Signup / Login'
    home.getNavMenuItem("Signup / Login").click();

    // Step 5: 'New User Signup!' visible
    cy.url().should("include", "/login");
    signup.getNewUserHeader().should("be.visible");

    // Step 6 + 7: Enter name + existing email and click 'Signup'
    // (PO reads USER_EMAIL from env; spec não digita nada)
    signup.startSignupWithExistingFromEnv();

    // Step 8: Error visible
    signup.getExistingEmailError().should("be.visible");
  });
});
