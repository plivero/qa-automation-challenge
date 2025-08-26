// cypress/e2e/specs/personalTests/signup-login.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";

const home = new HomePage();
const login = new LoginPage();

describe("Signup / Login flow (POM)", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("navigates to the login page via navbar", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();

    cy.url().should("include", "/login");
    login.getLoginPageHeader().should("be.visible");
  });

  it("shows error with invalid credentials", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();

    login.loginWith("fake@example.com", "wrong-pass");

    login.getLoginErrorMessage().should("be.visible");
  });

  it("logs in successfully with env credentials and logs out", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();

    login.loginWithValid();

    login.getLoggedInLabel().should("be.visible");

    // logout (no conditions)
    login.logout();

    cy.url().should("include", "/login");
    login.getLoginPageHeader().should("be.visible");
  });
});
