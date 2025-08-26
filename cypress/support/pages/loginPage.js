// cypress/support/pages/loginPage.js
// @ts-check
/// <reference types="cypress" />

export class LoginPage {
  visit() {
    cy.visit("/login");
  }

  get emailInput() {
    return cy.get('[data-qa="login-email"]');
  }

  get passwordInput() {
    return cy.get('[data-qa="login-password"]');
  }

  get submitButton() {
    return cy.get('[data-qa="login-button"]');
  }

  loginWith(email, password) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    this.submitButton.click();
  }

  loginWithValid() {
    this.loginWith(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
  }

  getLoginPageHeader() {
    return cy.contains("Login to your account");
  }

  getLoggedInLabel() {
    return cy.contains("Logged in as");
  }

  getLoginErrorMessage() {
    return cy.contains("Your email or password is incorrect!");
  }

  logout() {
    cy.contains("Logout").click();
  }
}
