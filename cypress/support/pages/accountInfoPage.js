// cypress/support/pages/accountInfoPage.js
// @ts-check
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class AccountInfoPage {
  // Header "ENTER ACCOUNT INFORMATION"
  getEnterAccountInfoHeader() {
    // Just wait longer and scope to <b> (common on this page)
    return cy.contains("b", /ENTER ACCOUNT INFORMATION/i, { timeout: 15000 });
  }

  // Fill all required fields in a fixed, simple way (no conditions, no overrides)
  fillAllFields() {
    const password = Cypress.env("USER_PASSWORD");

    // Title / Password / DOB
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').clear().type(password);
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("December");
    cy.get('[data-qa="years"]').select("1990");

    // Checkboxes (always checked)
    cy.get("#newsletter").check({ force: true });
    cy.get("#optin").check({ force: true });

    // Address (faker)
    cy.get('[data-qa="first_name"]').clear().type(faker.person.firstName());
    cy.get('[data-qa="last_name"]').clear().type(faker.person.lastName());
    cy.get('[data-qa="company"]').clear().type(faker.company.name());
    cy.get('[data-qa="address"]').clear().type(faker.location.streetAddress());
    cy.get('[data-qa="address2"]')
      .clear()
      .type(faker.location.secondaryAddress());
    cy.get('[data-qa="country"]').select("Canada");
    cy.get('[data-qa="state"]').clear().type(faker.location.state());
    cy.get('[data-qa="city"]').clear().type(faker.location.city());
    cy.get('[data-qa="zipcode"]').clear().type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').clear().type(faker.phone.number());
  }

  clickCreateAccount() {
    cy.get('[data-qa="create-account"]').click();
  }
}
