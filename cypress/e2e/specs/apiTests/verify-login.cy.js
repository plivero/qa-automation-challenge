import {
  buildAccountPayload,
  invalidCredentials,
  accountEdgeCases,
} from "../../../support/factories/userFactory";

describe("API 7 - Verify Login with valid data", () => {
  const payload = buildAccountPayload();

  before(() => {
    // Create account (happy path base)
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: payload,
    });
  });

  it("Should return 200 and message 'User exists!'", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: { email: payload.email, password: payload.password },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(200);
      expect(data.message).to.eq("User exists!");
    });
  });

  // Wrong password
  it("Should return 404 when password is wrong", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: { email: payload.email, password: invalidCredentials.password },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq("User not found!");
    });
  });

  it("Should return 404 when email is not registered", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: { email: invalidCredentials.email, password: payload.password },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq("User not found!");
    });
  });

  it("Should return 404 when both email and password are invalid", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: {
        email: invalidCredentials.email,
        password: invalidCredentials.password,
      },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq("User not found!");
    });
  });

  it("Should return 400 when password is missing", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: { email: payload.email },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, email or password parameter is missing in POST request."
      );
    });
  });

  it("Should return 404 when email format is invalid", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: {
        email: accountEdgeCases.invalidEmailFormat.email,
        password: payload.password,
      },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq("User not found!");
    });
  });
});
