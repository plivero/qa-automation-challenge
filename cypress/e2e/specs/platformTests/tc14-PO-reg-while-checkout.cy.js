// Test Case 14: Place Order — Register while Checkout

describe("UI Platform - TC14: Place Order (register during checkout)", () => {
  it("completes order after registering at checkout", () => {
    const name = "Checkout User";
    const email = `tc14_${Date.now()}@example.com`;

    // 1–3) Launch & verify home
    cy.visit("/");
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Add products to cart (first product)
    cy.get('a[href="/products"]').first().click({ force: true });
    cy.location("pathname").should("eq", "/products");
    cy.get(".features_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });

    // 5) Click 'Cart' button
    cy.contains(/Continue Shopping/i).click();
    cy.get('a[href="/view_cart"]').first().click({ force: true });

    // 6) Verify cart page is displayed
    cy.location("pathname").should("eq", "/view_cart");

    // 7) Click 'Proceed To Checkout'
    cy.contains(/Proceed To Checkout/i).click();

    // 8) Click 'Register / Login' inside the modal
    cy.get(".modal-content", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get('a[href="/login"]').click({ force: true });
      });

    // 9) Ensure we land on /login (fallback if modal eats the click) and do SIGNUP
    cy.location("pathname", { timeout: 8000 }).then((p) => {
      if (!p.includes("/login")) cy.visit("/login");
    });
    cy.location("pathname").should("include", "/login");
    cy.contains("New User Signup!").should("be.visible");
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // (enter account information page)
    cy.contains(/ENTER ACCOUNT INFORMATION/i, { timeout: 10000 }).should(
      "be.visible"
    );

    // 9 - continue) Fill details and create account
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').type("123456");
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("December");
    cy.get('[data-qa="years"]').select("1990");
    cy.get('[data-qa="first_name"]').type("Checkout");
    cy.get('[data-qa="last_name"]').type("User");
    cy.get('[data-qa="address"]').type("Street 123");
    cy.get('[data-qa="country"]').select("Canada");
    cy.get('[data-qa="state"]').type("ON");
    cy.get('[data-qa="city"]').type("Toronto");
    cy.get('[data-qa="zipcode"]').type("A1B2C3");
    cy.get('[data-qa="mobile_number"]').type("1234567890");
    cy.get('[data-qa="create-account"]').click();

    // 10) Verify 'ACCOUNT CREATED!' and click 'Continue'
    cy.contains(/ACCOUNT CREATED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });

    // 11) Verify 'Logged in as username'
    cy.contains("Logged in as").should("contain.text", "Checkout User");

    // 12) Click 'Cart' button
    cy.get('a[href="/view_cart"]').first().click({ force: true });

    // 13) Click 'Proceed To Checkout'
    cy.contains(/Proceed To Checkout/i).click();

    // 14) Verify Address Details and Review Your Order
    cy.contains(/Address Details/i).should("be.visible");
    cy.contains(/Review Your Order/i).should("be.visible");

    // 15) Enter description and click 'Place Order'
    cy.get('textarea[name="message"]').type("Please deliver ASAP.");
    cy.contains(/Place Order/i).click();

    // 16) Enter payment details
    cy.get('[data-qa="name-on-card"]').type(name);
    cy.get('[data-qa="card-number"]').type("4111111111111111");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2026");

    // 17) Pay and Confirm
    cy.get('[data-qa="pay-button"]').click();

    // 18) Success message (copy varies on the site)
    cy.contains(/(ORDER PLACED!|Your order has been placed successfully!)/i, {
      timeout: 15000,
    }).should("be.visible");
    // opcional: reforço com a linha de confirmação quando presente
    cy.contains(/order has been confirmed/i).should("exist");

    // 19) Delete Account
    cy.contains("Delete Account").click();

    // 20) 'ACCOUNT DELETED!' and Continue
    cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });
  });
});
