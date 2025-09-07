describe("API 3 - GET All Brands List", () => {
  it("Should return 200 and a list of brands", () => {
    cy.request("GET", "/api/brandsList").then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(200);
      expect(data.brands).to.be.an("array");
    });
  });
});
