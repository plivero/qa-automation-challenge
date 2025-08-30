describe("API 4 - PUT To All Brands List", () => {
  it("Should return responseCode 405 inside body with proper message", () => {
    cy.request({
      method: "PUT",
      url: "/api/brandsList",
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
});
