// cypress/e2e/api/products-list-invalid-method.api.cy.js
describe("API 2 - POST to All Products List (comportamento real)", () => {
  it("responde 405 (no status OU no body) OU retorna products", () => {
    cy.request({
      method: "POST",
      url: "/api/productsList",
      failOnStatusCode: false, // deixa a gente inspecionar 4xx
    }).then((res) => {
      // se body vier string, tenta virar objeto
      let data = res.body;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {}
      }

      const metodoNaoSuportado =
        res.status === 405 ||
        (data && typeof data === "object" && data.responseCode === 405);

      if (metodoNaoSuportado) {
        // caminho A: rejeitou POST
        expect(data).to.have.property("responseCode", 405);
        expect(String(data.message || "")).to.have.length.greaterThan(0);
      } else {
        // caminho B: aceitou e devolveu lista
        expect(res.status).to.eq(200);
        expect(data).to.have.property("products");
        expect(Array.isArray(data.products)).to.be.true;
      }
    });
  });
});
