// cypress/support/pages/signupPage.js
// @ts-check
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class SignupPage {
  // Header "New User Signup!"
  getNewUserHeader() {
    return cy.contains("New User Signup!");
  }

  /**
   * Start signup with random name and unique email.
   * Returns { name, email } for later assertions.
   */
  startNewSignup() {
    const name = faker.person.fullName();
    const email = `ui_${Date.now()}_${faker.string.alphanumeric(
      5
    )}@example.com`;

    cy.get('[data-qa="signup-name"]').clear().type(name);
    cy.get('[data-qa="signup-email"]').clear().type(email);
    cy.get('[data-qa="signup-button"]').click();

    return { name, email };
  }

  /**
   * Start signup with provided values.
   */
  startSignupWith({ name, email }) {
    cy.get('[data-qa="signup-name"]').clear().type(name);
    cy.get('[data-qa="signup-email"]').clear().type(email);
    cy.get('[data-qa="signup-button"]').click();
  }

  /**
   * Try to sign up using an existing email from env (no inputs in spec).
   */
  startSignupWithExistingFromEnv() {
    const name = "Already User";
    const email = Cypress.env("USER_EMAIL");
    if (!email) throw new Error("USER_EMAIL not set in cypress.env.json");
    this.startSignupWith({ name, email });
  }

  /**
   * Error message when email already exists.
   */
  getExistingEmailError() {
    return cy.contains(/Email Address already exist!?/i);
  }
}
