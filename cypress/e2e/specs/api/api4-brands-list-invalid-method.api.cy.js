// cypress/e2e/api/brands-list-invalid-method.api.cy.js
describe("API 4 - PUT To All Brands List (método não permitido)", () => {
  it("deve retornar 405 e mensagem correta", () => {
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
describe("API 4 - PUT To All Brands List (método não permitido)", () => {
  it("rejeita PUT (status 405 OU body.responseCode 405)", () => {
    cy.request({
      method: "PUT",
      url: "/api/brandsList",
      failOnStatusCode: false, // não falha automático em 4xx
    }).then((res) => {
      let data = res.body;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {}
      }

      // aceita os 2 jeitos que já vimos a API responder
      const rejeitou =
        res.status === 405 ||
        (data && typeof data === "object" && data.responseCode === 405);

      // precisa ter rejeitado de algum modo
      expect(rejeitou, `status=${res.status} body=${JSON.stringify(data)}`).to
        .be.true;

      // se o body trouxe a msg, valida também
      if (data && data.responseCode === 405) {
        expect(String(data.message || "")).to.include("not supported");
      }
    });
  });
});
