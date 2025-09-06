/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";
import { createUserAPI } from "../../../support/helpers/userApi";

const homePage = new HomePage();
const loginPage = new LoginPage();

describe("UI Platform - TC4: Logout User", () => {
  before(() => {
    createUserAPI();
  });

  it("logs in and logs out (steps 1–10)", () => {
    // Step 1–2: open site
    homePage.visit();

    // Step 3: home visible
    homePage.getLogo().should("be.visible");

    // Step 4: go to 'Signup / Login'
    homePage.getNavMenuItem("Signup / Login").click();

    // Step 5: 'Login to your account' visible
    cy.url().should("include", "/login");
    loginPage.getLoginPageHeader().should("be.visible");

    // Step 6–7: login with env creds (PO does the typing/click)
    loginPage.loginWithValid();

    // Step 8: 'Logged in as' visible
    loginPage.getLoggedInLabel().should("be.visible");

    // Step 9: click 'Logout'
    loginPage.logout();

    // Step 10: back on login page
    cy.url().should("include", "/login");
    loginPage.getLoginPageHeader().should("be.visible");
  });
});
