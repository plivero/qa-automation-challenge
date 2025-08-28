describe("API 4 - PUT To All Brands List", () => {
  it("should return responseCode 405 inside body with proper message", () => {
    cy.request({
      method: "PUT",
      url: "/api/brandsList",
      failOnStatusCode: false, // do not fail test on 200 with error message
    }).then(({ status, body }) => {
      // API returns body as JSON string, so we must parse
      const data = JSON.parse(body);

      // HTTP status is always 200 on this site
      expect(status).to.eq(200);

      // Validate error response from body
      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
});
