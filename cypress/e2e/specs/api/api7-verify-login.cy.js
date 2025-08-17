// cypress/e2e/api/verify-login-valid.api.cy.js
describe("API 7 - Verify Login com dados válidos", () => {
  it("deve retornar 200 e mensagem 'User exists!'", () => {
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

      // body pode vir string ou objeto
      const data = typeof body === "string" ? JSON.parse(body) : body;

      expect(data).to.have.property("message", "User exists!");
    });
  });
});
