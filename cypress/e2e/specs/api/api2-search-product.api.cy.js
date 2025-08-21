// cypress/e2e/api/search-product.api.cy.js
describe("API 5 - POST To Search Product", () => {
  it("lists ALL products when search_product is empty", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: { search_product: "" }, // empty => returns all
    }).then((res) => {
      // 1) status
      expect(res.status).to.eq(200);

      // if body is returned as string, convert to object
      let data = res.body;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      // 3) basic structure
      expect(data).to.have.property("products");
      const list = data.products;
      expect(Array.isArray(list)).to.be.true;
      expect(list.length).to.be.greaterThan(0);

      // 4) get unique categories with a "raw" for loop
      const categories = [];
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const cat = p.category && p.category.category; // can be undefined
        if (cat && categories.indexOf(cat) === -1) {
          categories.push(cat);
        }
      }

      // 5) get up to 3 example names
      const examples = [];
      for (let i = 0; i < list.length && examples.length < 3; i++) {
        examples.push(list[i].name);
      }

      // 6) simple logs
      cy.log(`Total products: ${list.length}`);
      cy.log(`Distinct categories: ${categories.join(", ")}`);
      cy.log(`Examples: ${examples.join(" | ")}`);
    });
  });

  it('search for "dress" (name OR category must contain the term)', () => {
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
            `Item does NOT match "${term}": ${item.name} | cat=${cat}`
          );
        }
      });
    });
  });

  it('search for "tops" (name OR category must contain the term)', () => {
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
            `Item does NOT match "${term}": ${item.name} | cat=${cat}`
          );
        }
      });
    });
  });
});
