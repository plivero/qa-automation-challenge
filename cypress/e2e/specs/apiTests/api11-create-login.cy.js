// cypress/e2e/specs/apiTests/api-11-createAccount.cy.js
import {
  buildAccountPayload,
  accountEdgeCases,
} from "../../../support/factories/userFactory";

describe("API 11 - POST To Create/Register User Account", () => {
  let payload;

  before(() => {
    payload = buildAccountPayload();
  });

  it("Should return 201 and message 'User created!'", () => {
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(201);
      expect(data.message).to.eq("User created!");
    });
  });

  it("Should return 400 when creating with an existing email", () => {
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq("Email already exists!");
    });
  });

  it("Should return 400 when email is missing", () => {
    const payload = buildAccountPayload();
    delete payload.email;

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
    });
  });

  it("Should return 400 when password is missing", () => {
    const payload = buildAccountPayload();
    delete payload.password;

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
    });
  });

  it("Should return 400 when required fields are empty strings", () => {
    const payload = buildAccountPayload(accountEdgeCases.emptyFields);

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
    });
  });

  it("Should return 400 when email format is invalid", () => {
    const payload = buildAccountPayload(accountEdgeCases.invalidEmailFormat);

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
    });
  });
});
