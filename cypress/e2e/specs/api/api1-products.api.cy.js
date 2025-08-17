// cypress/e2e/api/products.api.cy.js

describe("API - Lista de Produtos", () => {
  it("deve retornar 200 e uma lista de produtos", () => {
    // 1) faz a requisição GET
    cy.request("/api/productsList").then((response) => {
      // 2) valida o status HTTP
      expect(response.status).to.eq(200);

      // 3) pega o body
      let data = response.body;

      // 4) se o body vier como string, converte para objeto
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      // 5) o body precisa ter a chave "products"
      expect(data).to.have.property("products");

      // 6) "products" precisa ser um array
      const list = data.products;
      expect(Array.isArray(list)).to.be.true;

      // 7) garante que tem pelo menos 1 item
      expect(list.length).to.be.greaterThan(0);

      // 8) checa campos básicos do primeiro item
      const first = list[0];
      expect(first).to.have.property("id");
      expect(first).to.have.property("name");
    });
  });
});
