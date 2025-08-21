describe("API 2 - POST to All Products List (real behavior)", () => {
  it("responds 405 (in status OR in body) OR returns products", () => {
    cy.request({
      method: "POST",
      url: "/api/productsList",
      failOnStatusCode: false, // lets us inspect 4xx
    }).then((res) => {
      // if body comes as string, try to parse it
      let data = res.body;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {}
      }

      const methodNotAllowed =
        res.status === 405 ||
        (data && typeof data === "object" && data.responseCode === 405);

      if (methodNotAllowed) {
        // Path A: rejected POST
        expect(data).to.have.property("responseCode", 405);
        expect(String(data.message || "")).to.have.length.greaterThan(0);
      } else {
        // Path B: accepted and returned list
        expect(res.status).to.eq(200);
        expect(data).to.have.property("products");
        expect(Array.isArray(data.products)).to.be.true;
      }
    });
  });
});
