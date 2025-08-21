describe("API 6 - Search Product without parameter", () => {
  it("returns 400 (correct) or 200 with list/error in body (flaky tolerated)", () => {
    cy.request({
      method: "POST",
      url: "/api/searchProduct",
      form: true,
      body: {}, // without search_product
      failOnStatusCode: false, // do not fail on 4xx
    }).then(({ status, body }) => {
      // body may come as string
      const data =
        typeof body === "string"
          ? (() => {
              try {
                return JSON.parse(body);
              } catch {
                throw new Error(
                  `Non-JSON body with status ${status}: ${String(body).slice(
                    0,
                    200
                  )}`
                );
              }
            })()
          : body;

      if (status === 400) {
        // Correct behavior (documented)
        expect(data).to.have.property(
          "message",
          "Bad request, search_product parameter is missing in POST request"
        );
        return;
      }

      if (status === 200) {
        // Flaky: 200 + list
        if (Array.isArray(data?.products)) {
          expect(data.products.length).to.be.greaterThan(0);
          return;
        }
        // Flaky: 200 + error in body
        if (data?.message) {
          expect(data).to.have.property("responseCode", 400);
          expect(data.message).to.match(/missing in POST request/i);
          return;
        }
        // 200 without products or message
        throw new Error(
          `Unexpected 200 without products/message: ${JSON.stringify(
            data
          ).slice(0, 200)}`
        );
      }

      // ❌ Any other status
      throw new Error(`Unexpected status: ${status}`);
    });
  });
});
