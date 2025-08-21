// Test Case 2: Login User with correct email and password

describe("UI Platform - TC2 Login (wrong credentials)", () => {
  const user = {
    name: "Test Pvsl",
    email: `ui_tc2_${Date.now()}@example.com`,
    password: "123456",
  };

  // Pre-condition: ensure user exists (via API 11)
  before(() => {
    cy.request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: "Mr",
        birth_date: "10",
        birth_month: "12",
        birth_year: "1990",
        firstname: "UI",
        lastname: "Test",
        company: "UI Co",
        address1: "Street 1",
        address2: "Suite 2",
        country: "Country",
        zipcode: "A1B2C3",
        state: "CO",
        city: "City",
        mobile_number: "1234567890",
      },
    });
  });

  it("Login and delete account", () => {
    // 1-2) Launch + Navigate
    cy.visit("/");

    // 3) Verify home page visible
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click 'Signup / Login'
    cy.contains("Signup / Login").click();

    // 5) Verify 'Login to your account' visible
    cy.contains("Login to your account").should("be.visible");

    // 6) Enter correct email and password
    cy.get('[data-qa="login-email"]').clear().type(user.email);
    cy.get('[data-qa="login-password"]')
      .clear()
      .type(user.password, { log: false });

    // 7) Click 'login' button
    cy.get('[data-qa="login-button"]').click();

    // 8) Verify 'Logged in as username'
    cy.contains("Logged in as").should("contain.text", user.name);

    // 9) Click 'Delete Account'
    cy.contains("Delete Account").click();

    // 10) Verify 'ACCOUNT DELETED!'
    cy.contains(/Account Deleted!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });
  });
});
