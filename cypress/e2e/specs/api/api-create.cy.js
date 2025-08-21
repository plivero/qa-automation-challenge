describe("API create - Create Account with data from .env", () => {
  it("creates or recognizes the already existing account", () => {
    cy.request({
      log: false,
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

      if (status === 201) {
        expect(data.message).to.eq("User created!");
      } else if (status === 200) {
        expect(data.message || "").to.match(/user (created|exists)/i);
      } else {
        throw new Error(`Unexpected status: ${status}`);
      }
    });
  });
});
