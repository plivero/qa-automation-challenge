describe("API - Product List", () => {
  it("should return 200 and a list of products", () => {
    // GET
    cy.request("/api/productsList").then((response) => {
      // HTTP status
      expect(response.status).to.eq(200);

      // body
      let data = response.body;

      // if body is returned as string, convert to object
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      // 5) body must have the key "products"
      expect(data).to.have.property("products");

      // 6) "products" must be an array
      const list = data.products;
      expect(Array.isArray(list)).to.be.true;

      // 7) must have at least 1 item
      expect(list.length).to.be.greaterThan(0);

      // 8) check basic first fields
      const first = list[0];
      expect(first).to.have.property("id");
      expect(first).to.have.property("name");
    });
  });
});
