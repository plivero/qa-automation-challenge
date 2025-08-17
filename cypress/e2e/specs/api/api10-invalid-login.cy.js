// cypress/e2e/api/verify-login-invalid.api.cy.js
describe("API 10 - Verify Login com credenciais inválidas", () => {
  it("deve retornar 404 'User not found!'", () => {
    const invalidEmail = `qa_${Date.now()}@example.com`;

    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false, // aceitar 4xx sem quebrar
      body: {
        email: invalidEmail,
        password: "wrong-pass",
      },
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      if (status === 404) {
        // comportamento documentado
        expect(data).to.have.property("message", "User not found!");
        return;
      }
      if (status === 200) {
        // flakiness: 200 com erro no body
        expect(data).to.have.property("responseCode", 404);
        expect(data.message).to.match(/user not found/i);
        return;
      }

      throw new Error(`Status inesperado: ${status}`);
    });
  });
});
