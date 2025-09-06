describe("API 2 - POST To All Products List (invalid method)", () => {
  it("Should return responseCode 405 and proper message", () => {
    cy.request({
      method: "POST",
      url: "/api/productsList",
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });

  it("Should return 405 when using PUT instead of GET", () => {
    cy.request({
      method: "PUT",
      url: "/api/productsList",
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
  it("Should return 405 when using DELETE instead of GET", () => {
    cy.request({
      method: "DELETE",
      url: "/api/productsList",
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
});
