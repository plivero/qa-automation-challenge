/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { createUserAPI } from "../../../support/helpers/userApi";

const homePage = new HomePage();
const loginPage = new LoginPage();
const statusPage = new AccountStatusPage();

before(() => {
  createUserAPI();
});

describe("UI Platform - TC2: Login User with correct email and password", () => {
  it("logs in and deletes the account", () => {
    // Step 1: Launch browser
    homePage.visit();

    // Step 2: Verify that home page is visible
    homePage.getLogo().should("be.visible");

    // Step 3: Go to Signup / Login
    homePage.getNavMenuItem("Signup / Login").click();

    // Step 4: Verify login page header
    loginPage.getLoginPageHeader().should("be.visible");

    // Step 5–6: Login with ENV credentials
    loginPage.loginWithValid();

    // Step 7: Verify 'Logged in as' is visible
    statusPage
      .getLoggedInLabel()
      .should("contain.text", Cypress.env("USER_NAME"));

    // Step 8: Delete account
    statusPage.clickDeleteAccount();

    // Step 9: Verify account deleted
    statusPage.getAccountDeletedMessage().should("be.visible");
    statusPage.clickContinue();
  });
});
