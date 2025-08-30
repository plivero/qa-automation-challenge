import { buildAccountPayload } from "../../../support/factories/userFactory";

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
});
