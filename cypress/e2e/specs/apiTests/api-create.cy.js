// cypress/e2e/specs/api/api-create.cy.js
import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API create - Create Account", () => {
  it("Create new account", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.message).to.eq("User created!");
    });
  });

  it("do not allow to create with an existing email", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    });

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    }).then(({ body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq("Email already exists!");
    });
  });
});
