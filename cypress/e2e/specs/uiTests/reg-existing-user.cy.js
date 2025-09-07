/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { SignupPage } from "../../../support/pages/signupPage";
import { createUserAPI } from "../../../support/helpers/userApi";

const homePage = new HomePage();
const signupPage = new SignupPage();

before(() => {
  createUserAPI();
});

describe("UI Platform - TC5: Register with existing email", () => {
  it("shows 'Email Address already exist!' error", () => {
    // Step 1: Launch browser (handled by Cypress)

    // Step 2: Open site (home)
    homePage.visit();

    // Step 3: Home visible (logo)
    homePage.getLogo().should("be.visible");

    // Step 4: Click 'Signup / Login'
    homePage.getNavMenuItem("Signup / Login").click();

    // Step 5: 'New User Signup!' visible
    cy.url().should("include", "/login");
    signupPage.getNewUserHeader().should("be.visible");

    // Step 6 + 7: Enter name + existing email and click 'Signup'
    signupPage.startSignupWithExistingFromEnv();

    // Step 8: Error visible
    signupPage.getExistingEmailError().should("be.visible");
  });
});
