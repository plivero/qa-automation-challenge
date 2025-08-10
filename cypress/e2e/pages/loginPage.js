// @ts-check
/// <reference types="cypress" />

export class LoginPage {
  visit() {
    cy.visit("/login"); // usa baseUrl do cypress.config.js
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

  assertOnLoginPage() {
    cy.url().should("include", "/login");
    cy.contains("Login to your account").should("be.visible");
  }

  assertLoginSuccess() {
    cy.contains("Logged in as").should("be.visible");
  }

  assertLoginError() {
    cy.contains("Your email or password is incorrect!").should("be.visible");
  }

  logout() {
    cy.contains("Logout").click();
  }
}
