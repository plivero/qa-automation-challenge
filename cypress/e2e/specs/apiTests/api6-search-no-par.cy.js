describe("API 6 - POST To Search Product without parameter", () => {
  it("Should return responseCode 400 with proper error message", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      failOnStatusCode: false,
      body: {}, // missing search_product parameter
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, search_product parameter is missing in POST request."
      );
    });
  });
});
