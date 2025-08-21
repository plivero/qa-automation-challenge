describe("API 9 - DELETE /verifyLogin", () => {
  it("should reject DELETE method with appropriate error", () => {
    cy.request({
      method: "DELETE",
      url: "/api/verifyLogin",
      failOnStatusCode: false, // do not break on 4xx/5xx
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;

      if (status === 405) {
        // correct behavior (doc)
        expect(data).to.have.property(
          "message",
          "This request method is not supported."
        );
      } else if (status === 200) {
        // known bug: 200 but body signals error
        expect(data).to.have.property("responseCode", 405);
        expect(data.message).to.match(/not supported/i);
      } else {
        // any other unexpected status
        throw new Error(`Unexpected status: ${status}`);
      }
    });
  });
});
