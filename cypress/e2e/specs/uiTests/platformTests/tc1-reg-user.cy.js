/// <reference types="cypress" />

import { HomePage } from "../../../../support/pages/homePage";
import { SignupPage } from "../../../../support/pages/signupPage";
import { AccountInfoPage } from "../../../../support/pages/accountInfoPage";
import { AccountStatusPage } from "../../../../support/pages/accountStatusPage";

const home = new HomePage();
const signup = new SignupPage();
const account = new AccountInfoPage();
const status = new AccountStatusPage();

describe("UI Platform - TC1: Register User", () => {
  it("registers a new user and deletes the account", () => {
    // go to Signup/Login
    home.visit();
    home.getLogo().should("be.visible");
    home.getNavMenuItem("Signup / Login").click();

    // new user header visible
    cy.url().should("include", "/login");
    signup.getNewUserHeader().should("be.visible");

    // start signup (faker inside PO) -> returns { name, email }
    const { name, email } = signup.startNewSignup();

    // fill account info (faker inside PO) and create account
    account.getEnterAccountInfoHeader().should("be.visible");
    account.fillAllFields();
    account.clickCreateAccount();

    // created → continue
    status.getAccountCreatedMessage().should("be.visible");
    status.clickContinue();

    // logged in as <name> (from faker)
    status.getLoggedInLabel().should("contain.text", name);

    // delete account → continue
    status.clickDeleteAccount();
    status.getAccountDeletedMessage().should("be.visible");
    status.clickContinue();

    // trace
    cy.log(`Registered and deleted: ${name} - ${email}`);
  });
});
