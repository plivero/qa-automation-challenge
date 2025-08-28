describe("API 8 - POST To Verify Login without email parameter", () => {
  it("should return responseCode 400 with proper error message", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false, // allow 200 with error in body
      body: {
        password: "valid_password", // missing email
      },
    }).then(({ status, body }) => {
      const data = JSON.parse(body);

      // HTTP status is always 200
      expect(status).to.eq(200);

      // Error code and message inside body
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, email or password parameter is missing in POST request."
      );
    });
  });
});
