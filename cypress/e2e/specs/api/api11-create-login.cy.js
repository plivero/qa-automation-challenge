// cypress/e2e/api/create-account.api.cy.js
describe("API 11 - Create/Register User Account", () => {
  it("deve criar conta nova e mostrar todos os dados no log", () => {
    const uniqueEmail = `test_${Date.now()}@example.com`;
    const password = "123456";

    const bodyReq = {
      name: "QA Test XYZ",
      email: uniqueEmail,
      password,
      title: "Mr",
      birth_date: "10",
      birth_month: "12",
      birth_year: "1990",
      firstname: "QA",
      lastname: "Tester",
      company: "Test Company",
      address1: "123 Test Street",
      address2: "321 Street Test",
      country: "TestCountry",
      zipcode: "A1B2C3",
      state: "Test State",
      city: "Test City",
      mobile_number: "+1234567890",
    };

    // loga o request completo
    cy.log("===== REQUEST BODY =====");
    Object.entries(bodyReq).forEach(([k, v]) => cy.log(`${k}: ${v}`));

    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: bodyReq,
    }).then(({ status, body, headers }) => {
      cy.log("===== RESPONSE STATUS =====");
      cy.log(`status: ${status}`);

      cy.log("===== RESPONSE HEADERS =====");
      Object.entries(headers).forEach(([k, v]) => cy.log(`${k}: ${v}`));

      cy.log("===== RESPONSE BODY =====");
      cy.log(JSON.stringify(body, null, 2));

      const data = typeof body === "string" ? JSON.parse(body) : body;

      if (status === 201) {
        expect(data).to.have.property("message", "User created!");
      } else if (status === 200) {
        expect(data.message).to.match(/user created/i);
      } else {
        throw new Error(`Status inesperado: ${status}`);
      }
    });
  });
});
