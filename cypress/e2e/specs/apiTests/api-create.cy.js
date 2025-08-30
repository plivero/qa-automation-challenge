// cypress/e2e/specs/api/api-create.cy.js
import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API create - Create Account", () => {
  function createAccount(payload) {
    return cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    });
  }

  it("Create new account", () => {
    const payload = buildAccountPayload();

    createAccount(payload).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(201); //checked by seeing the cy.log
      expect(data.message).to.eq("User created!");
    });
  });

  it("Do not allow to create with an existing email", () => {
    const payload = buildAccountPayload();

    createAccount(payload);
    createAccount(payload).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq("Email already exists!");
    });
  });
});
