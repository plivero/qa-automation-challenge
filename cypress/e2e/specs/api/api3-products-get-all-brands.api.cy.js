describe("API 3 - GET All Brands List", () => {
  it("should return 200 and a list of brands", () => {
    cy.request("/api/brandsList").then((res) => {
      expect(res.status).to.eq(200);

      // if body comes as string, convert; if already object, use directly
      let data = res.body;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      expect(data).to.have.property("brands"); // has the key
      expect(Array.isArray(data.brands)).to.be.true; // is array
      expect(data.brands.length).to.be.greaterThan(0); // not empty

      // optional sanity check on the first item
      const first = data.brands[0];
      expect(first).to.have.property("id");
      expect(first).to.have.property("brand");
    });
  });
});
