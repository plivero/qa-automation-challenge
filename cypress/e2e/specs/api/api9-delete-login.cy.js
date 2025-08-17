// cypress/e2e/api/verify-login-delete.api.cy.js
describe("API 9 - DELETE /verifyLogin", () => {
  it("deve rejeitar método DELETE com erro apropriado", () => {
    cy.request({
      method: "DELETE",
      url: "/api/verifyLogin",
      failOnStatusCode: false, // não quebrar em 4xx/5xx
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      if (status === 405) {
        // ✅ comportamento correto (doc)
        expect(data).to.have.property(
          "message",
          "This request method is not supported."
        );
      } else if (status === 200) {
        // ✅ bug conhecido: 200 mas corpo sinaliza erro
        expect(data).to.have.property("responseCode", 405);
        expect(data.message).to.match(/not supported/i);
      } else {
        // ❌ qualquer outro status não previsto
        throw new Error(`Status inesperado: ${status}`);
      }
    });
  });
});
