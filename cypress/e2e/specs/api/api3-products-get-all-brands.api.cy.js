describe("API 3 - GET All Brands List", () => {
  it("deve retornar 200 e lista de brands", () => {
    cy.request("/api/brandsList").then((res) => {
      expect(res.status).to.eq(200);

      // se body vier string, converte; se já for objeto, usa direto
      let data = res.body;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      expect(data).to.have.property("brands"); // tem a chave
      expect(Array.isArray(data.brands)).to.be.true; // é array
      expect(data.brands.length).to.be.greaterThan(0); // não vazio

      // sanity opcional no primeiro item
      const first = data.brands[0];
      expect(first).to.have.property("id");
      expect(first).to.have.property("brand");
    });
  });
});
