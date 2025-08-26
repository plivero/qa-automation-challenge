describe("API 2 - POST To All Products List (invalid method)", () => {
  it("should return 200 with responseCode 405 and proper message", () => {
    cy.request({
      method: "POST",
      url: "/api/productsList",
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      // Normalize: parse when body is a JSON string, otherwise use as-is

      const data = JSON.parse(body);
      expect(status).to.eq(200);
      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
});
