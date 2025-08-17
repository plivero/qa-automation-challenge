// cypress/e2e/api/verify-login-no-email.api.cy.js
describe("API 8 - Verify Login sem email", () => {
  it("deve retornar erro por falta do parâmetro email", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: {
        // email ausente de propósito
        password: Cypress.env("USER_PASSWORD"),
      },
      failOnStatusCode: false, // não falhar automaticamente
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      if (status === 400) {
        // comportamento documentado
        expect(data).to.have.property(
          "message",
          "Bad request, email or password parameter is missing in POST request."
        );
      } else if (status === 200) {
        // bug conhecido: 200 mas corpo indica erro
        expect(data).to.have.property("responseCode", 400);
        expect(data.message).to.match(/missing in POST request/i);
      } else {
        // qualquer outro status inesperado
        throw new Error(`Status inesperado: ${status}`);
      }
    });
  });
});
