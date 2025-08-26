describe("API 5 - POST To Search Product", () => {
  it("should return 200 and a list of searched products", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true, // send as application/x-www-form-urlencoded
      body: { search_product: "top" }, // example search term
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body || {};

      expect(status).to.eq(200);
      expect(data).to.have.property("products").that.is.an("array").and.not
        .empty;
    });
  });
});
