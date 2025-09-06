// cypress/support/helpers/userApi.js
// @ts-check
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export function ensureUserViaApi() {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");
  const name = Cypress.env("USER_NAME");

  // Step 1: try login
  cy.request({
    method: "POST",
    url: "/api/verifyLogin",
    form: true,
    body: { email, password },
    failOnStatusCode: false,
  });

  // Step 2: try create
  cy.request({
    method: "POST",
    url: "/api/createAccount",
    form: true,
    failOnStatusCode: false,
    body: {
      name,
      email,
      password,
      title: "Mr",
      birth_date: faker.number.int({ min: 1, max: 28 }).toString(),
      birth_month: faker.number.int({ min: 1, max: 12 }).toString(),
      birth_year: faker.date.past({ years: 30 }).getFullYear().toString(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: "Canada",
      zipcode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.phone.number(),
    },
  });
}
