import { buildAccountPayload } from "../../../support/factories/userFactory";

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
        const detail = JSON.parse(body);

        expect(detail.responseCode).to.eq(200);
        expect(detail).to.have.property("user");
        expect(detail.user).to.have.property("email", payload.email);
      });
    });
  });
});
