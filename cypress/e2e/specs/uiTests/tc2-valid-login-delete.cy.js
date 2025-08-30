/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";
import { AccountStatusPage } from "../../../support/pages/accountStatusPage";
import { buildAccountPayload } from "../../../support/factories/userFactory";

const home = new HomePage();
const login = new LoginPage();
const status = new AccountStatusPage();

/** @type {{ name: string; email: string; password: string }} */
let user;

// Pre-condition (setup): create a user via API using the factory (simple and short)
before(() => {
  const payload = buildAccountPayload();
  user = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };

  cy.request({
    method: "POST",
    url: "/api/createAccount",
    form: true,
    failOnStatusCode: false,
    body: payload,
  }).then(({ status, body }) => {
    const data = JSON.parse(body);
    expect(status).to.eq(200);
    expect(data.message).to.eq("User created!");
  });
});

describe("UI Platform - TC2: Login User with correct email and password", () => {
  it("logs in and deletes the account", () => {
    // Step 1: Launch browser (Cypress handles the browser automatically)

    // Step 2: Navigate to url 'http://automationexercise.com'
    home.visit();

    // Step 3: Verify that home page is visible successfully
    home.getLogo().should("be.visible");

    // Step 4: Click on 'Signup / Login' button
    home.getNavMenuItem("Signup / Login").click();

    // Step 5: Verify 'Login to your account' is visible
    login.getLoginPageHeader().should("be.visible");

    // Step 6: Enter correct email address and password
    // Step 7: Click 'login' button (the click happens inside loginWith)
    login.loginWith(user.email, user.password);

    // Step 8: Verify that 'Logged in as username' is visible
    status.getLoggedInLabel().should("contain.text", user.name);

    // Step 9: Click 'Delete Account' button
    status.clickDeleteAccount();

    // Step 10: Verify that 'ACCOUNT DELETED!' is visible
    status.getAccountDeletedMessage().should("be.visible");
    status.clickContinue();
  });
});
