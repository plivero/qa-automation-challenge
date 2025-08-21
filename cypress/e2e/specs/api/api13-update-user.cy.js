describe("API 13 - Update User Account", () => {
  it("updates the account from .env (self-contained)", () => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");

    const ensureUser = () =>
      cy.request({
        method: "POST",
        url: "/api/createAccount",
        form: true,
        failOnStatusCode: false,
        body: {
          name: "QA Fixed",
          email,
          password,
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
      });

    const updateUser = () =>
      cy.request({
        method: "PUT",
        url: "/api/updateAccount",
        form: true,
        failOnStatusCode: false,
        body: {
          name: "QA Updated",
          email,
          password, // same password
          company: "Updated Co",
          address1: "New Street 123",
          city: "Toronto",
          country: "Canada",
          mobile_number: "+1987654321",
        },
      });

    updateUser()
      .then(({ status, body }) => {
        const data = typeof body === "string" ? JSON.parse(body) : body;

        // if user not found, create and try again
        if (
          (status === 404 || status === 200) &&
          /account not found/i.test(String(data.message))
        ) {
          return ensureUser().then(() => updateUser());
        }

        return { status, body };
      })
      .then(({ status, body }) => {
        const msg = String(
          (typeof body === "string" ? JSON.parse(body) : body).message || ""
        );
        expect(status).to.eq(200);
        expect(msg).to.match(/user updated/i);
      });
  });
});
