describe("API 13 - Update User Account", () => {
  it("updates the account from .env (simplified)", () => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");

    const bodyReq = {
      name: "QA Updated",
      email,
      password, // keep the same
      company: "Updated Co",
      address1: "New Street 123",
      city: "Toronto",
      country: "Canada",
      mobile_number: "+1987654321",
    };

    // log the entire object at once
    cy.log("REQUEST BODY:", JSON.stringify(bodyReq));

    cy.request({
      method: "PUT",
      url: "/api/updateAccount",
      form: true,
      failOnStatusCode: false,
      body: bodyReq,
    }).then(({ status, body }) => {
      cy.log("RESPONSE:", JSON.stringify(body));

      expect(status).to.eq(200);
      const data = typeof body === "string" ? JSON.parse(body) : body;
      expect(data.message).to.match(/user updated/i);
    });
  });
});
