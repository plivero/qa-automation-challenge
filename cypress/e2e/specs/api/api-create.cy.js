// cypress/e2e/specs/api/api-create.cy.js
describe("API create - Create Account with data from .env", () => {
  it("creates or recognizes the already existing account", () => {
    cy.request({
      log: false,
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false, // important to handle 4xx/5xx manually
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
      // Ensure object
      const data = typeof body === "string" ? JSON.parse(body) : body || {};
      const msg = String(data.message || "").toLowerCase();

      // Successful creation (ideal REST: 201)
      if (status === 201) {
        // Accepts "User created!" and simple variations
        expect(msg).to.match(/user created!?/i);
        return;
      }

      // Already exists (many back-ends use 409; some return 200)
      if (status === 409 || status === 200) {
        // Robust regex covering: "Email already exists!", "User exists", etc.
        expect(msg).to.match(
          /(?:user|email)(?: already)? (?:created|exist)s?!?/i
        );
        return;
      }

      // Any other status is unexpected
      throw new Error(
        `Unexpected status: ${status} | message: ${data.message}`
      );
    });
  });
});
