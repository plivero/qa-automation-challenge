describe("API 3 - GET All Brands List", () => {
  it("should return 200 and a list of brands", () => {
    cy.request("GET", "/api/brandsList").then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body || {};

      expect(status).to.eq(200);
      expect(data).to.have.property("brands").that.is.an("array").and.not.empty;
    });
  });
});
