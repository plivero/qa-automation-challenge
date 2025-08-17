// Test Case 15: Place Order — Register before Checkout

describe("UI Platform - TC15: Place Order (register before checkout)", () => {
  it("registers first, then places an order", () => {
    const name = "BeforeCheckout User";
    const email = `tc15_${Date.now()}@example.com`;

    // 1–3) Launch & verify home
    cy.visit("/");
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Click 'Signup / Login'
    cy.get('a[href="/login"]').first().click({ force: true });

    // 5) Fill all details in Signup and create account
    cy.location("pathname").should("include", "/login");
    cy.contains("New User Signup!").should("be.visible");
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains(/ENTER ACCOUNT INFORMATION/i, { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').type("123456");
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("December");
    cy.get('[data-qa="years"]').select("1990");
    cy.get('[data-qa="first_name"]').type("BeforeCheckout");
    cy.get('[data-qa="last_name"]').type("User");
    cy.get('[data-qa="address"]').type("Street 123");
    cy.get('[data-qa="country"]').select("Canada");
    cy.get('[data-qa="state"]').type("ON");
    cy.get('[data-qa="city"]').type("Toronto");
    cy.get('[data-qa="zipcode"]').type("A1B2C3");
    cy.get('[data-qa="mobile_number"]').type("+1234567890");
    cy.get('[data-qa="create-account"]').click();

    // 6) Verify 'ACCOUNT CREATED!' and click 'Continue'
    cy.contains(/ACCOUNT CREATED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });

    // 7) Verify 'Logged in as username'
    cy.contains("Logged in as").should("contain.text", "BeforeCheckout User");

    // 8) Add products to cart (add first product from Products page)
    cy.get('a[href="/products"]').first().click({ force: true });
    cy.location("pathname").should("eq", "/products");
    cy.get(".features_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });

    // 9) Click 'Cart' button (use navbar)
    cy.contains(/Continue Shopping/i).click();
    cy.get('a[href="/view_cart"]').first().click({ force: true });

    // 10) Verify cart page is displayed
    cy.location("pathname").should("eq", "/view_cart");

    // 11) Click 'Proceed To Checkout'
    cy.contains(/Proceed To Checkout/i).click();

    // 12) Verify Address Details and Review Your Order
    cy.contains(/Address Details/i).should("be.visible");
    cy.contains(/Review Your Order/i).should("be.visible");

    // 13) Enter description and click 'Place Order'
    cy.get('textarea[name="message"]').type("Please deliver ASAP.");
    cy.contains(/Place Order/i).click();

    // 14) Enter payment details
    cy.get('[data-qa="name-on-card"]').type(name);
    cy.get('[data-qa="card-number"]').type("4111111111111111");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2026");

    // 15) Click 'Pay and Confirm Order'
    cy.get('[data-qa="pay-button"]').click();

    // 16) Verify success message
    cy.contains(/(ORDER PLACED!|Your order has been placed successfully!)/i, {
      timeout: 15000,
    }).should("be.visible");

    // 17) Click 'Delete Account'
    cy.contains("Delete Account").click();

    // 18) Verify 'ACCOUNT DELETED!' and click 'Continue'
    cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });
  });
});
