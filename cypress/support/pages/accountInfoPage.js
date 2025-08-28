// cypress/support/pages/accountInfoPage.js
// @ts-check
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class AccountInfoPage {
  // Header "ENTER ACCOUNT INFORMATION"
  getEnterAccountInfoHeader() {
    return cy.contains(/ENTER ACCOUNT INFORMATION/i);
  }

  /**
   * Fill all required fields using faker + env password.
   * No assertions here; spec handles validations.
   */
  fillAllFields() {
    const password = Cypress.env("USER_PASSWORD");

    // Title / Password / DOB
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').clear().type(password);
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("December");
    cy.get('[data-qa="years"]').select("1990");

    // Checkboxes
    cy.get("#newsletter").check({ force: true });
    cy.get("#optin").check({ force: true });

    // Address block (faker)
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

  /**
   * Same as fillAllFields but allows overrides.
   */
  fillAllFieldsWith(overrides = {}) {
    const password = overrides.password ?? Cypress.env("USER_PASSWORD");

    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').clear().type(password);
    cy.get('[data-qa="days"]').select(overrides.day ?? "10");
    cy.get('[data-qa="months"]').select(overrides.month ?? "December");
    cy.get('[data-qa="years"]').select(overrides.year ?? "1990");

    if (overrides.newsletter !== false)
      cy.get("#newsletter").check({ force: true });
    if (overrides.optin !== false) cy.get("#optin").check({ force: true });

    cy.get('[data-qa="first_name"]')
      .clear()
      .type(overrides.firstName ?? faker.person.firstName());
    cy.get('[data-qa="last_name"]')
      .clear()
      .type(overrides.lastName ?? faker.person.lastName());
    cy.get('[data-qa="company"]')
      .clear()
      .type(overrides.company ?? faker.company.name());
    cy.get('[data-qa="address"]')
      .clear()
      .type(overrides.address1 ?? faker.location.streetAddress());
    cy.get('[data-qa="address2"]')
      .clear()
      .type(overrides.address2 ?? faker.location.secondaryAddress());
    cy.get('[data-qa="country"]').select(overrides.country ?? "Canada");
    cy.get('[data-qa="state"]')
      .clear()
      .type(overrides.state ?? faker.location.state());
    cy.get('[data-qa="city"]')
      .clear()
      .type(overrides.city ?? faker.location.city());
    cy.get('[data-qa="zipcode"]')
      .clear()
      .type(overrides.zip ?? faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]')
      .clear()
      .type(overrides.phone ?? faker.phone.number());
  }

  clickCreateAccount() {
    cy.get('[data-qa="create-account"]').click();
  }
}
