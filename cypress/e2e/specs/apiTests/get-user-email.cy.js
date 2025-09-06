import {
  buildAccountPayload,
  invalidCredentials,
} from "../../../support/factories/userFactory";

describe("API 14 - GET user account detail by email", () => {
  it("Should create and then fetch user detail by email", () => {
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

      // Step 2: get user details by email
      cy.request({
        method: "GET",
        url: `/api/getUserDetailByEmail?email=${payload.email}`,
        failOnStatusCode: false,
      }).then(({ body }) => {
        const data = JSON.parse(body);

        expect(data.responseCode).to.eq(200);
        expect(data).to.have.property("user");
        expect(data.user).to.have.property("email", payload.email);
      });
    });
  });

  it("Should return 404 when email does not exist", () => {
    cy.request({
      method: "GET",
      url: `/api/getUserDetailByEmail?email=${invalidCredentials.email}`,
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq(
        "Account not found with this email, try another email!"
      );
    });
  });

  it("Should return 400 when email parameter is missing", () => {
    cy.request({
      method: "GET",
      url: "/api/getUserDetailByEmail",
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, email parameter is missing in GET request."
      );
    });
  });

  it("Should return 405 when using POST instead of GET", () => {
    cy.request({
      method: "POST",
      url: "/api/getUserDetailByEmail",
      form: true,
      body: { email: invalidCredentials.email },
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;
      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
});
