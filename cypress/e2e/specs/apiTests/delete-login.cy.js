describe("API 9 - DELETE To Verify Login", () => {
  it("Should return responseCode 405 with proper message", () => {
    cy.request({
      method: "DELETE",
      url: "/api/verifyLogin",
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
});
