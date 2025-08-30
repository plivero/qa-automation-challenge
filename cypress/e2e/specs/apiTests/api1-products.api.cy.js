describe("API - Product List", () => {
  it("should return 200 and a list of products", () => {
    cy.request("/api/productsList").then(({ status, body }) => {
      // Assert HTTP status
      expect(status).to.eq(200);

      // Normalize body: API sometimes returns JSON as a string
      const data = JSON.parse(body);

      // Assert products array exists and has at least one item
      expect(data)
        .to.have.property("products")
        .and.to.be.an("array")
        .and.to.have.length.greaterThan(0);

      // Assert minimal shape of the first product
      const [first] = data.products;
      expect(first).to.include.all.keys("id", "name");
    });
  });
});
