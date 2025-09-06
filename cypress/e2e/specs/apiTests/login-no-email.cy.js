import { buildAccountPayload } from "../../../support/factories/userFactory";

describe("API 8 - POST To Verify Login without email parameter", () => {
  const payload = buildAccountPayload();

  it("Should return responseCode 400 with proper error message", () => {
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: {
        password: payload.password, // missing email
      },
    }).then(({ body }) => {
      const data = JSON.parse(body);

      expect(data.responseCode).to.eq(400);
      expect(data.message).to.eq(
        "Bad request, email or password parameter is missing in POST request."
      );
    });
  });
});
