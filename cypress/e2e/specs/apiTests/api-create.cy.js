// cypress/e2e/specs/api/api-create.cy.js
import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API create - Create Account", () => {
  it("cria uma nova conta", () => {
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

  it("não permite criar conta com e-mail já existente", () => {
    const payload = buildAccountPayload();

    // Setup: cria a conta uma vez
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
