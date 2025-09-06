/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";

const homePage = new HomePage();
const loginPage = new LoginPage();

describe("UI Platform - TC3: Login with incorrect email and password", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("shows an error when email and password are incorrect", () => {
    // Step 1: Launch browser (Cypress already handles)

    // Step 2: Navigate to url 'http://automationexercise.com'
    homePage.visit();

    // Step 3: Verify that home page is visible successfully
    homePage.getLogo().should("be.visible");

    // Step 4: Click on 'Signup / Login' button
    homePage.getNavMenuItem("Signup / Login").click();

    // Step 5: Verify 'Login to your account' is visible
    loginPage.getLoginPageHeader().should("be.visible");

    // Step 6 + 7: Enter incorrect email/password and click 'login'
    // (PO generates wrong creds and clicks the button)
    loginPage.loginWithInvalidDefaults();

    // Step 8: Verify error 'Your email or password is incorrect!' is visible
    loginPage.getLoginErrorMessage().should("be.visible");
  });
});
