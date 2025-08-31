import {
  buildAccountPayload,
  buildUpdatedPayload,
  invalidCredentials,
  accountEdgeCases,
} from "../../../support/factories/userFactory";

describe("API 13 - PUT METHOD To Update User Account", () => {
  it("Should create and then update the user account (fresh faker values)", () => {
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

      // Step 2: update user with new faker data (same email/password)
      const updatedPayload = buildUpdatedPayload(payload);

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: updatedPayload,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const updData = JSON.parse(body);
        expect(updData.responseCode).to.eq(200);
        expect(updData.message).to.eq("User updated!");
      });
    });
  });

  it("Should return 404 when password is wrong (email exists)", () => {
    const payload = buildAccountPayload();

    // create first
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      // attempt update with wrong password
      const wrongPwd = {
        ...buildUpdatedPayload(payload),
        password: invalidCredentials.password,
      };

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: wrongPwd,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const data = JSON.parse(body);
        expect(data.responseCode).to.eq(404);
        expect(data.message).to.eq("Account not found!");
      });
    });
  });

  it("Should return 404 when email does not exist", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      const nonExistentEmailUpdate = {
        ...buildUpdatedPayload(payload),
        email: invalidCredentials.email, // email not registered
      };

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: nonExistentEmailUpdate,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const data = JSON.parse(body);
        expect(data.responseCode).to.eq(404);
        expect(data.message).to.eq("Account not found!");
      });
    });
  });

  it("Should return 400 when email is missing", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      const noEmail = { ...buildUpdatedPayload(payload) };
      delete noEmail.email;

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: noEmail,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const data = JSON.parse(body);
        // a API costuma mencionar o método na mensagem
        expect(data.responseCode).to.eq(400);
        expect(data.message).to.eq(
          "Bad request, email parameter is missing in PUT request."
        );
      });
    });
  });

  it("Should return 400 when password is missing", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      const noPwd = { ...buildUpdatedPayload(payload) };
      delete noPwd.password;

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: noPwd,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const data = JSON.parse(body);
        expect(data.responseCode).to.eq(400);
        expect(data.message).to.eq(
          "Bad request, password parameter is missing in PUT request."
        );
      });
    });
  });

  it("Should return 404 when email and password are empty strings", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      const emptyCreds = {
        ...buildUpdatedPayload(payload),
        email: accountEdgeCases.emptyFields.email,
        password: accountEdgeCases.emptyFields.password,
      };

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: emptyCreds,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const data = JSON.parse(body);
        expect(data.responseCode).to.eq(404);
        expect(data.message).to.eq("Account not found!");
      });
    });
  });

  it("Should return 200 when only a single field is updated", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      const partial = {
        email: payload.email,
        password: payload.password,
        city: "Testville",
      };

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: partial,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const data = JSON.parse(body);
        expect(data.responseCode).to.eq(200);
        expect(data.message).to.eq("User updated!");
      });
    });
  });

  it("Should return 405 when using POST instead of PUT", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        method: "POST",
        url: "/api/updateAccount",
        form: true,
        body: buildUpdatedPayload(payload),
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(405);
        const data = typeof body === "string" ? JSON.parse(body) : body; // in this case the API already returns body as an object ({detail: ...}), so parsing directly would break

        expect(data.detail).to.eq('Method "POST" not allowed.');
      });
    });
  });
});
