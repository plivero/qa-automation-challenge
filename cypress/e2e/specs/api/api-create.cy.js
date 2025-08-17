// cypress/e2e/api/create-account-from-env.api.cy.js
describe("API create - Create Account com dados do .env", () => {
  it("cria ou reconhece a conta já existente", () => {
    cy.request({
      log: false, // não loga o body nem segredos
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: {
        name: "QA Fixed",
        email: Cypress.env("USER_EMAIL"),
        password: Cypress.env("USER_PASSWORD"),
        title: "Mr",
        birth_date: "10",
        birth_month: "12",
        birth_year: "1990",
        firstname: "QA",
        lastname: "Fixed",
        company: "Test Co",
        address1: "Street 1",
        address2: "Suite 1",
        country: "Canada",
        zipcode: "A1B2C3",
        state: "State",
        city: "City",
        mobile_number: "+1234567890",
      },
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      // aceita criado, já existente ou 200 bugado
      if (status === 201) {
        expect(data.message).to.eq("User created!");
      } else if (status === 200) {
        expect(data.message || "").to.match(/user (created|exists)/i);
      } else {
        throw new Error(`Status inesperado: ${status}`);
      }
    });
  });
});
