// cypress/e2e/specs/personalTests/tc4-logout-user.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";
import { UserApiPage } from "../../../support/pages/userApiPage";

const home = new HomePage();
const login = new LoginPage();
const userApi = new UserApiPage();

describe("UI Platform - TC4: Logout User", () => {
  // ensure env user exists ONLY for this spec (no e2e.js changes)
  before(() => {
    userApi.ensureEnvUser();
  });

  it("logs in and logs out (steps 1–10)", () => {
    // Step 1–2: open site
    home.visit();

    // Step 3: home visible
    home.getLogo().should("be.visible");

    // Step 4: go to 'Signup / Login'
    home.getNavMenuItem("Signup / Login").click();

    // Step 5: 'Login to your account' visible
    cy.url().should("include", "/login");
    login.getLoginPageHeader().should("be.visible");

    // Step 6–7: login with env creds (PO does the typing/click)
    login.loginWithValid();

    // Step 8: 'Logged in as' visible
    login.getLoggedInLabel().should("be.visible");

    // Step 9: click 'Logout'
    login.logout();

    // Step 10: back on login page
    cy.url().should("include", "/login");
    login.getLoginPageHeader().should("be.visible");
  });
});
