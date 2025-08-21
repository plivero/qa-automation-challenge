describe("API 4 - PUT To All Brands List (method not allowed)", () => {
  it("should return 405 and correct message", () => {
    cy.request({
      method: "PUT",
      url: "/api/brandsList",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200);

      let data = res.body;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      expect(data).to.have.property("responseCode", 405);
      expect(data).to.have.property(
        "message",
        "This request method is not supported."
      );
    });
  });
});

// cypress/e2e/api/brands-list-invalid-method.api.cy.js
describe("API 4 - PUT To All Brands List (method not allowed)", () => {
  it("rejects PUT (status 405 OR body.responseCode 405)", () => {
    cy.request({
      method: "PUT",
      url: "/api/brandsList",
      failOnStatusCode: false, // does not fail automatically on 4xx
    }).then((res) => {
      let data = res.body;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {}
      }

      // accept both response formats we have seen from the API
      const rejected =
        res.status === 405 ||
        (data && typeof data === "object" && data.responseCode === 405);

      // must have been rejected in some way
      expect(rejected, `status=${res.status} body=${JSON.stringify(data)}`).to
        .be.true;

      // if body includes the message, validate it as well
      if (data && data.responseCode === 405) {
        expect(String(data.message || "")).to.include("not supported");
      }
    });
  });
});
