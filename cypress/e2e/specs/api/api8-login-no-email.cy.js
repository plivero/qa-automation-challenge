describe("API 8 - Verify Login without email", () => {
  it("should return an error due to missing email parameter", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: {
        // email intentionally omitted
        password: Cypress.env("USER_PASSWORD"),
      },
      failOnStatusCode: false, // do not fail automatically
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      if (status === 400) {
        // documented behavior
        expect(data).to.have.property(
          "message",
          "Bad request, email or password parameter is missing in POST request."
        );
      } else if (status === 200) {
        // known bug: 200 but body indicates error
        expect(data).to.have.property("responseCode", 400);
        expect(data.message).to.match(/missing in POST request/i);
      } else {
        // any other unexpected status
        throw new Error(`Unexpected status: ${status}`);
      }
    });
  });
});
