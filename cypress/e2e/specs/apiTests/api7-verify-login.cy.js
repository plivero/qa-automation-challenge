// cypress/e2e/specs/api/api7-verify-login.cy.js
// @ts-check
/// <reference types="cypress" />

import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API 7 - Verify Login with valid data", () => {
  const payload = buildAccountPayload();

  before(() => {
    // Create account
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    });
  });

  it("Should return 200 and message 'User exists!'", () => {
    // Act: verify login with the same credentials
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: {
        email: payload.email,
        password: payload.password,
      },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(200);
      expect(data.message).to.eq("User exists!");
    });
  });
});
