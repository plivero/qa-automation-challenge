import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API 11 - POST To Create/Register User Account", () => {
  it("Should return 201 and message 'User created!'", () => {
    const payload = buildAccountPayload();

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
});
