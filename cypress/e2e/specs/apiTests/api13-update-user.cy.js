import {
  buildAccountPayload,
  buildUpdatedPayload,
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
        const upd = JSON.parse(body);
        expect(upd.responseCode).to.eq(200); // responseCode from body returns 200
        expect(upd.message).to.eq("User updated!");
      });
    });
  });
});
