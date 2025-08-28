// cypress/support/pages/userApiPage.js
// @ts-check
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class UserApiPage {
  ensureEnvUser() {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");
    const name = Cypress.env("USER_NAME");

    // step 1: always try login
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: { email, password },
      failOnStatusCode: false,
    });

    // step 2: always try to create user (faker fills the rest)
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
}
