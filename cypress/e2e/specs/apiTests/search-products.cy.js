import { searchTerms } from "../../../support/factories/userFactory";

describe("API 5 - POST To Search Product", () => {
  it("Should return 200 and a list of searched products", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: { search_product: searchTerms.valid },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(200);
      expect(data.products).to.be.an("array");
    });
  });
  it("Should return 200 and a list of searched another products", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: { search_product: searchTerms.anotherValid },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(200);
      expect(data.products).to.be.an("array");
    });
  });
  it("Should return 200 and an empty array when searching invalid products", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: { search_product: searchTerms.invalid },
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(200);
      expect(data.products).to.be.an("array").that.is.empty;
    });
  });
});
