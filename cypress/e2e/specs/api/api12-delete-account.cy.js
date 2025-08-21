describe("API 12 - DELETE /deleteAccount", () => {
  it("should delete the account (200)", () => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");

    if (!email || !password) {
      throw new Error("USER_EMAIL or USER_PASSWORD missing in .env");
    }

    cy.request({
      log: false, // hide request from log
      method: "DELETE",
      url: "/api/deleteAccount",
      form: true,
      failOnStatusCode: false,
      body: { email, password },
    }).then(({ status, body }) => {
      expect(status).to.eq(200);

      if (typeof body === "string") {
        expect(body).to.match(/account deleted/i);
      } else if (body?.message) {
        expect(body.message).to.match(/account deleted/i);
      } else if (typeof body?.responseCode === "number") {
        expect(body.responseCode).to.eq(200);
      } else {
        throw new Error("Unexpected response format.");
      }
    });
  });
});
