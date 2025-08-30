describe("API 8 - POST To Verify Login without email parameter", () => {
  it("Should return responseCode 400 with proper error message", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: {
        password: Cypress.env("USER_PASSWORD"), // missing email
      },
    }).then(({ body }) => {
      const data = JSON.parse(body);

      // Error code and message inside body
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, email or password parameter is missing in POST request."
      );
    });
  });
});
