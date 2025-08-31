describe("API - Product List", () => {
  it("Should return 200 and a list of products", () => {
    cy.request("/api/productsList").then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(200);
      expect(data)
        .to.have.property("products")
        .and.to.be.an("array")
        .and.to.have.length.greaterThan(0);
      const [first] = data.products;
      expect(first).to.include.all.keys("id", "name");
    });
  });

  it("Should return 405 when using POST instead of GET", () => {
    cy.request({
      method: "POST",
      url: "/api/productsList",
      failOnStatusCode: false,
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(405);
    });
  });
});
