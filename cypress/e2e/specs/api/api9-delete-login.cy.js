describe("API 9 - DELETE To Verify Login", () => {
  it("should return responseCode 405 with proper message", () => {
    cy.request({
      method: "DELETE",
      url: "/api/verifyLogin",
      failOnStatusCode: false, // HTTP is 200 but body has error
    }).then(({ status, body }) => {
      const data = JSON.parse(body);

      expect(status).to.eq(200); // this site always returns 200
      expect(data.responseCode).to.eq(405);
      expect(data.message).to.eq("This request method is not supported.");
    });
  });
});
