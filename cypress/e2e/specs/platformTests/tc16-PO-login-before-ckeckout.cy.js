// Test Case 16: Place Order — Login before Checkout

describe("UI Platform - TC16: Place Order (login before checkout)", () => {
  it("logs in first, then places an order", () => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");
    const name = Cypress.env("USER_NAME") || "UI Tester";
    if (!email || !password)
      throw new Error("Set USER_EMAIL/USER_PASSWORD in cypress.env.json");

    // ---- Precondition: ensure the account exists (create if missing) ----
    cy.request({
      method: "POST",
      url: "/api/verifyLogin",
      form: true,
      body: { email, password },
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      const data = typeof body === "string" ? JSON.parse(body) : body;
      const exists = status === 200 && /User exists/i.test(data?.message || "");
      if (!exists) {
        // create account silently
        return cy.request({
          method: "POST",
          url: "/api/createAccount",
          form: true,
          failOnStatusCode: false,
          body: {
            name,
            email,
            password,
            title: "Mr",
            birth_date: "10",
            birth_month: "12",
            birth_year: "1990",
            firstname: "UI",
            lastname: "Tester",
            company: "Test Co",
            address1: "Street 123",
            address2: "",
            country: "Canada",
            zipcode: "A1B2C3",
            state: "ON",
            city: "Toronto",
            mobile_number: "+1234567890",
          },
        });
      }
    });

    // 1–3) Launch & verify home
    cy.visit("/");
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Click 'Signup / Login'
    cy.get('a[href="/login"]').first().click({ force: true });

    // 5) Fill email/password and click 'Login'
    cy.location("pathname").should("include", "/login");
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });
    cy.get('[data-qa="login-button"]').click();

    // 6) Verify 'Logged in as username'
    cy.get(".navbar-nav", { timeout: 10000 })
      .contains(/Logged in as/i)
      .should("be.visible");

    // 7) Add products to cart (first product)
    cy.get('a[href="/products"]').first().click({ force: true });
    cy.location("pathname").should("eq", "/products");
    cy.get(".features_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });

    // 8) Click 'Cart' button
    cy.contains(/Continue Shopping/i).click();
    cy.get('a[href="/view_cart"]').first().click({ force: true });

    // 9) Verify cart page is displayed
    cy.location("pathname").should("eq", "/view_cart");

    // 10) Click 'Proceed To Checkout'
    cy.contains(/Proceed To Checkout/i).click();

    // 11) Verify Address Details and Review Your Order
    cy.contains(/Address Details/i).should("be.visible");
    cy.contains(/Review Your Order/i).should("be.visible");

    // 12) Enter description and click 'Place Order'
    cy.get('textarea[name="message"]').type("Please deliver ASAP.");
    cy.contains(/Place Order/i).click();

    // 13) Enter payment details
    cy.get('[data-qa="name-on-card"]').type(name);
    cy.get('[data-qa="card-number"]').type("4111111111111111");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2026");

    // 14) Click 'Pay and Confirm Order'
    cy.get('[data-qa="pay-button"]').click();

    // 15) Success
    cy.contains(/(ORDER PLACED!|Your order has been placed successfully!)/i, {
      timeout: 15000,
    }).should("be.visible");

    // 16) Delete Account
    cy.contains("Delete Account").click();

    // 17) 'ACCOUNT DELETED!' and Continue
    cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });
  });
});
