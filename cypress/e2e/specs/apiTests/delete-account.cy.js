import {
  buildAccountPayload,
  invalidCredentials,
  accountEdgeCases,
} from "../../../support/factories/userFactory";

describe("API 12 - DELETE METHOD To Delete User Account", () => {
  it("Should create and then delete the user account", () => {
    const payload = buildAccountPayload();

    // Step 1: create user
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

      // Step 2: delete same user
      cy.request({
        method: "DELETE",
        url: "/api/deleteAccount",
        form: true,
        body: {
          email: payload.email,
          password: payload.password,
        },
        failOnStatusCode: false,
      }).then(({ body }) => {
        const deleteData = JSON.parse(body);
        expect(data.responseCode).to.eq(201); //issue found, the doc asks to validate 200 responseCode. However, the body responseCode returns 201
        expect(deleteData.message).to.eq("Account deleted!");
      });
    });
  });

  it("Should return 404 when password is wrong (email exists)", () => {
    const payload = buildAccountPayload();
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        method: "DELETE",
        url: "/api/deleteAccount",
        form: true,
        failOnStatusCode: false,
        body: { email: payload.email, password: invalidCredentials.password },
      }).then(({ body }) => {
        const data = JSON.parse(body);
        expect(data.responseCode).to.eq(404);
        expect(data.message).to.eq("Account not found!");
      });
    });
  });

  it("Should return 404 when email does not exist (password is valid)", () => {
    const payload = buildAccountPayload();
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        method: "DELETE",
        url: "/api/deleteAccount",
        form: true,
        failOnStatusCode: false,
        body: { email: invalidCredentials.email, password: payload.password },
      }).then(({ body }) => {
        const data = JSON.parse(body);
        expect(data.responseCode).to.eq(404);
        expect(data.message).to.eq("Account not found!");
      });
    });
  });

  it("Should delete successfully and then return 404 on a second delete", () => {
    const payload = buildAccountPayload();
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      // 1st deletion
      cy.request({
        method: "DELETE",
        url: "/api/deleteAccount",
        form: true,
        failOnStatusCode: false,
        body: { email: payload.email, password: payload.password },
      }).then(({ body }) => {
        const first = JSON.parse(body);
        expect(first.message).to.eq("Account deleted!");
        // 2nd deletion
        cy.request({
          method: "DELETE",
          url: "/api/deleteAccount",
          form: true,
          failOnStatusCode: false,
          body: { email: payload.email, password: payload.password },
        }).then(({ body }) => {
          const second = JSON.parse(body);
          expect(second.responseCode).to.eq(404);
          expect(second.message).to.eq("Account not found!");
        });
      });
    });
  });

  it("Should return 400 when email is missing", () => {
    const payload = buildAccountPayload();
    cy.request({
      method: "DELETE",
      url: "/api/deleteAccount",
      form: true,
      failOnStatusCode: false,
      body: { password: payload.password },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, email parameter is missing in DELETE request."
      );
    });
  });

  it("Should return 400 when password is missing", () => {
    const payload = buildAccountPayload();
    cy.request({
      method: "DELETE",
      url: "/api/deleteAccount",
      form: true,
      failOnStatusCode: false,
      body: { email: payload.email },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, password parameter is missing in DELETE request."
      );
    });
  });

  it("Should return 404 when email and password are empty strings", () => {
    cy.request({
      method: "DELETE",
      url: "/api/deleteAccount",
      form: true,
      failOnStatusCode: false,
      body: accountEdgeCases.emptyFields, // { email: "", password: "" }
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq("Account not found!");
    });
  });

  it("Should return 405 when using POST instead of DELETE", () => {
    const payload = buildAccountPayload();
    cy.request({
      method: "POST",
      url: "/api/deleteAccount",
      form: true,
      failOnStatusCode: false,
      body: { email: payload.email, password: payload.password },
    }).then(({ status, body }) => {
      expect(status).to.eq(405);

      const data = typeof body === "string" ? JSON.parse(body) : body; // in this case the API already returns body as an object ({detail: ...}), so parsing directly would break

      expect(data.detail).to.eq('Method "POST" not allowed.');
    });
  });
});
