// cypress/e2e/api/delete-account.api.cy.js
describe("API 12 - DELETE /deleteAccount", () => {
  it("deve deletar a conta (200)", () => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");

    if (!email || !password) {
      throw new Error("USER_EMAIL ou USER_PASSWORD ausentes no .env");
    }

    cy.request({
      log: false, // 👈 esconde request do log
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
        throw new Error("Formato de resposta inesperado.");
      }
    });
  });
});
