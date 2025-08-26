import {
  buildAccountPayload,
  buildUpdatedPayload,
} from "../../../support/factories/userFactory";

describe("API 13 - PUT METHOD To Update User Account", () => {
  it("should create and then update the user account (fresh faker values)", () => {
    const payload = buildAccountPayload();

    // Step 1: create user
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false, // site may return 200 or 201
    }).then(({ status, body }) => {
      const data = JSON.parse(body);
      expect([200, 201]).to.include(status);
      expect(data.message).to.eq("User created!");

      // Step 2: update user with new faker data (same email/password)
      const updatedPayload = buildUpdatedPayload(payload);

      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        body: updatedPayload,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        const upd = JSON.parse(body);
        expect(status).to.eq(200);
        expect(upd.message).to.eq("User updated!");
      });
    });
  });
});
