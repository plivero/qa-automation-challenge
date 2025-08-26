describe("API 10 - POST To Verify Login with invalid details", () => {
  it("should return responseCode 404 and message 'User not found!'", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false, // site returns HTTP 200 with error in body
      body: {
        email: "invalid_email@example.com",
        password: "wrong_password",
      },
    }).then(({ status, body }) => {
      const data = JSON.parse(body); // parse raw JSON string

      expect(status).to.eq(200); // this site usually returns 200
      expect(data.responseCode).to.eq(404);
      expect(data.message).to.eq("User not found!");
    });
  });
});
