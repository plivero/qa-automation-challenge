// cypress/e2e/specs/api/api7-verify-login.cy.js
// @ts-check
/// <reference types="cypress" />

import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API 7 - Verify Login with valid data", () => {
  /** @type {{ email: string; password: string }} */
  let user;

  before(() => {
    // Arrange: create a fresh user via factory (no hardcoded inputs)
    const payload = buildAccountPayload();
    user = { email: payload.email, password: payload.password };

    // Create account (API sometimes returns 200 instead of 201)
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false, // we assert only in the login step
      body: payload,
    });
  });

  it("should return 200 and message 'User exists!'", () => {
    // Act: verify login with the same credentials
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: {
        email: user.email,
        password: user.password,
      },
    }).then(({ status, body }) => {
      // Assert: status and message
      expect(status).to.eq(200);
      const data = JSON.parse(body); // simple parse as requested
      expect(data.message).to.eq("User exists!");
    });
  });
});
