import {
  buildSearchPayloadMissing,
  buildSearchPayloadEmpty,
  buildSearchPayloadWrongName,
} from "../../../support/factories/userFactory";

describe("API 6 - POST To Search Product without parameter", () => {
  it("Should return responseCode 400 with proper error message", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      failOnStatusCode: false,
      body: buildSearchPayloadMissing(),
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, search_product parameter is missing in POST request."
      );
    });
  });

  it("Should return 200 and array when search_product is empty string", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      failOnStatusCode: false,
      body: buildSearchPayloadEmpty(),
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(200);
      expect(data.products).to.be.an("array");
    });
  });

  it("Should return 400 when using wrong parameter name", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      failOnStatusCode: false,
      body: buildSearchPayloadWrongName(),
    }).then(({ body }) => {
      const data = JSON.parse(body);
      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, search_product parameter is missing in POST request."
      );
    });
  });
});
