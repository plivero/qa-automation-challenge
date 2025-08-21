describe("API 7 - Verify Login with valid data", () => {
  it("should return 200 and message 'User exists!'", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: {
        email: Cypress.env("USER_EMAIL"),
        password: Cypress.env("USER_PASSWORD"),
      },
    }).then(({ status, body }) => {
      expect(status).to.eq(200);

      // body may come as string or object
      const data = typeof body === "string" ? JSON.parse(body) : body;

      expect(data).to.have.property("message", "User exists!");
    });
  });
});
