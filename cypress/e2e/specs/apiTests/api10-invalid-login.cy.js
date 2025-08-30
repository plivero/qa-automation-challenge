import { invalidCredentials } from "../../../support/factories/userFactory";

describe("API 10 - POST To Verify Login with invalid details", () => {
  it("Should return responseCode 404 and message 'User not found!'", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: invalidCredentials,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq("User not found!");
    });
  });
});
