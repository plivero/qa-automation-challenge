// cypress/e2e/api/get-user-detail.api.cy.js
describe("API 14 - GET user account detail by email", () => {
  it("retorna os detalhes do usuário do .env", () => {
    const email = Cypress.env("USER_EMAIL");
    if (!email) throw new Error("USER_EMAIL não definido no .env");

    cy.request({
      method: "GET",
      url: "/api/getUserDetailByEmail",
      qs: { email }, // query string
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      cy.log("RESPONSE:", JSON.stringify(body, null, 2));

      expect(status).to.eq(200);

      const data = typeof body === "string" ? JSON.parse(body) : body;
      expect(data).to.have.property("user");
      expect(data.user).to.have.property("email", email);
    });
  });
});
