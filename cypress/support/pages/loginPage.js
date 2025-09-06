// cypress/support/pages/loginPage.js
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class LoginPage {
  elements = {
    emailInput: () => cy.get('[data-qa="login-email"]'),
    passwordInput: () => cy.get('[data-qa="login-password"]'),
    submitButton: () => cy.get('[data-qa="login-button"]'),
    loginPageHeader: () => cy.contains("Login to your account"),
    loggedInLabel: () => cy.contains("Logged in as"),
    loginError: () => cy.contains("Your email or password is incorrect!"),
    logoutButton: () => cy.contains("Logout"),
  };

  visit() {
    cy.visit("/login");
  }

  typeEmail(email) {
    this.elements.emailInput().clear().type(email);
  }

  typePassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  clickSubmit() {
    this.elements.submitButton().click();
  }

  loginWith(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSubmit();
  }

  loginWithValid() {
    this.loginWith(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
  }

  loginWithInvalidDefaults() {
    this.loginWith(faker.internet.email(), faker.internet.password());
  }

  getLoginPageHeader() {
    return this.elements.loginPageHeader();
  }

  getLoggedInLabel() {
    return this.elements.loggedInLabel();
  }

  getLoginErrorMessage() {
    return this.elements.loginError();
  }

  logout() {
    this.elements.logoutButton().click();
  }
}
