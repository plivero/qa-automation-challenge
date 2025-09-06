// cypress/support/pages/signupPage.js
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class SignupPage {
  elements = {
    newUserHeader: () => cy.contains("New User Signup!"),
    nameInput: () => cy.get('[data-qa="signup-name"]'),
    emailInput: () => cy.get('[data-qa="signup-email"]'),
    signupBtn: () => cy.get('[data-qa="signup-button"]'),
    existingEmailError: () => cy.contains(/Email Address already exist!?/i),
  };

  getNewUserHeader() {
    return this.elements.newUserHeader();
  }

  startNewSignup() {
    const name = faker.person.fullName();
    const email = `ui_${Date.now()}_${faker.string.alphanumeric(
      5
    )}@example.com`;

    this.elements.nameInput().clear().type(name);
    this.elements.emailInput().clear().type(email);
    this.elements.signupBtn().click();

    return { name, email };
  }

  startSignupWith({ name, email }) {
    this.elements.nameInput().clear().type(name);
    this.elements.emailInput().clear().type(email);
    this.elements.signupBtn().click();
  }

  startSignupWithExistingFromEnv() {
    const name = "Already User";
    const email = Cypress.env("USER_EMAIL");
    this.startSignupWith({ name, email });
  }
  getExistingEmailError() {
    return this.elements.existingEmailError();
  }
}
