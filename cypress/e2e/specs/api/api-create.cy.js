// cypress/e2e/specs/api/api-create.cy.js
import { buildAccountPayload } from "../../../support/factories/userFactory";
const payload = buildAccountPayload(); // factory should generate a unique email

describe("API create - Create Account", () => {
  it("creates a new account", () => {
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    }).then(({ status, body }) => {
      // Defensive parse: API may return JSON as a string

      const data = JSON.parse(body);
      cy.log("API Response: " + JSON.stringify(data));

      // Expect a successful creation (API may return 200)
      expect([201, 200]).to.include(status);
      expect(data.message).to.eq("User created!");
    });
  });

  it("creates a new account(existing)", () => {
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    }).then(({ body }) => {
      // Defensive parse: API may return JSON as a string

      const data = JSON.parse(body);
      cy.log("API Response: " + JSON.stringify(data));

      // Expect a successful creation (API may return 200)
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq("Email already exists!");
    });
  });
});
