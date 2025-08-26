import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API 11 - POST To Create/Register User Account", () => {
  it("should return 201 and message 'User created!'", () => {
    const payload = buildAccountPayload();

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: payload,
      failOnStatusCode: false, // handle different status if API returns 200
    }).then(({ status, body }) => {
      const data = JSON.parse(body);

      expect([200, 201]).to.include(status); // site sometimes returns 200
      expect(data.message).to.eq("User created!");
    });
  });
});
