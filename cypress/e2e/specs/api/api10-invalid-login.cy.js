describe("API 10 - Verify Login with invalid credentials", () => {
  it("should return 404 'User not found!'", () => {
    const invalidEmail = `qa_${Date.now()}@example.com`;

    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false, // accept 4xx without breaking
      body: {
        email: invalidEmail,
        password: "wrong-pass",
      },
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      if (status === 404) {
        // documented behavior
        expect(data).to.have.property("message", "User not found!");
        return;
      }
      if (status === 200) {
        // flakiness: 200 with error in body
        expect(data).to.have.property("responseCode", 404);
        expect(data.message).to.match(/user not found/i);
        return;
      }

      throw new Error(`Unexpected status: ${status}`);
    });
  });
});
