import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API 12 - DELETE METHOD To Delete User Account", () => {
  it("should create and then delete the user account", () => {
    const payload = buildAccountPayload();

    // Step 1: create user
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      const data = JSON.parse(body);
      expect([200, 201]).to.include(status);
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
      }).then(({ status, body }) => {
        const deleteData = JSON.parse(body);
        expect(status).to.eq(200);
        expect(deleteData.message).to.eq("Account deleted!");
      });
    });
  });
});
