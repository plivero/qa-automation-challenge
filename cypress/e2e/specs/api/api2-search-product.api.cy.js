// cypress/e2e/api/search-product.api.cy.js
describe("API 5 - POST To Search Product", () => {
  it("lista TODOS os produtos quando search_product está vazio", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: { search_product: "" }, // vazio => traz tudo
    }).then((res) => {
      // 1) status
      expect(res.status).to.eq(200);

      // 2) body pode vir string
      let data = res.body;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      // 3) valida estrutura básica
      expect(data).to.have.property("products");
      const list = data.products;
      expect(Array.isArray(list)).to.be.true;
      expect(list.length).to.be.greaterThan(0);

      // 4) pega categorias únicas com um for "raiz"
      const categorias = [];
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const cat = p.category && p.category.category; // pode ser undefined
        if (cat && categorias.indexOf(cat) === -1) {
          categorias.push(cat);
        }
      }

      // 5) pega até 3 exemplos de nomes
      const exemplos = [];
      for (let i = 0; i < list.length && exemplos.length < 3; i++) {
        exemplos.push(list[i].name);
      }

      // 6) logs simples
      cy.log(`Total de produtos: ${list.length}`);
      cy.log(`Categorias distintas: ${categorias.join(", ")}`);
      cy.log(`Exemplos: ${exemplos.join(" | ")}`);
    });
  });

  it('busca por "dress" (name OU category deve conter o termo)', () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: { search_product: "dress" },
    }).then((res) => {
      expect(res.status).to.eq(200);

      let data = res.body;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      expect(data).to.have.property("products");
      const list = data.products;
      expect(Array.isArray(list)).to.be.true;
      expect(list.length).to.be.greaterThan(0);

      const term = "dress";
      const toLower = (s) => String(s || "").toLowerCase();

      list.forEach((item) => {
        const term = "dress";
        const toLower = (s) => String(s || "").toLowerCase();
        const nameHas = toLower(item.name).includes(term);
        const cat = item.category && item.category.category;
        const catHas = toLower(cat).includes(term);
        const match = nameHas || catHas;

        if (!match) {
          throw new Error(
            `Item NÃO corresponde a "${term}": ${item.name} | cat=${cat}`
          );
        }
      });
    });
  });
  it('busca por "tops" (name OU category deve conter o termo)', () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: { search_product: "tops" },
    }).then((res) => {
      expect(res.status).to.eq(200);

      let data = res.body;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      expect(data).to.have.property("products");
      const list = data.products;
      expect(Array.isArray(list)).to.be.true;
      expect(list.length).to.be.greaterThan(0);

      const term = "tops";
      const toLower = (s) => String(s || "").toLowerCase();

      list.forEach((item) => {
        const nameHas = toLower(item.name).includes(term);
        const cat = item.category && item.category.category;
        const catHas = toLower(cat).includes(term);
        const match = nameHas || catHas;

        if (!match) {
          throw new Error(
            `Item NÃO corresponde a "${term}": ${item.name} | cat=${cat}`
          );
        }
      });
    });
  });
});
