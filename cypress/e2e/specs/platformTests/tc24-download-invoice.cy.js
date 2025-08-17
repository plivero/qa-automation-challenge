// cypress/e2e/platformTests/tc24-download-invoice.cy.js
// Test Case 24: Download Invoice after purchase order

describe("UI Platform - TC24: Download invoice after purchase", () => {
  it("finishes an order and downloads the invoice", () => {
    const name = "Invoice User";
    const email = `tc24_${Date.now()}@example.com`;

    // 1) Launch browser
    cy.visit("/");

    // 2) (baseUrl)

    // 3) Verify home page is visible
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Add products to cart (first product)
    cy.get('a[href="/products"]').first().click({ force: true });
    cy.location("pathname").should("include", "/products");
    cy.get(".features_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });

    // 5) Click 'Cart' button
    cy.contains(/View Cart/i, { timeout: 10000 }).click();

    // 6) Verify cart page is displayed
    cy.location("pathname").should("eq", "/view_cart");

    // 7) Click 'Proceed To Checkout'
    cy.contains(/Proceed To Checkout/i).click();

    // 8) Click 'Register / Login' (modal)
    cy.get(".modal-content", { timeout: 10000 })
      .should("be.visible")
      .within(() => cy.get('a[href="/login"]').click({ force: true }));

    // 9) Fill signup and create account
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
    cy.get('[data-qa="first_name"]').type("Invoice");
    cy.get('[data-qa="last_name"]').type("User");
    cy.get('[data-qa="address"]').type("Street 123");
    cy.get('[data-qa="country"]').select("India");
    cy.get('[data-qa="state"]').type("ON");
    cy.get('[data-qa="city"]').type("City");
    cy.get('[data-qa="zipcode"]').type("A1B2C3");
    cy.get('[data-qa="mobile_number"]').type("1234567890");
    cy.get('[data-qa="create-account"]').click();

    // 10) 'ACCOUNT CREATED!' + Continue
    cy.contains(/ACCOUNT CREATED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });

    // 11) 'Logged in as'
    cy.contains(/Logged in as/i).should("contain.text", name);

    // 12) Click 'Cart' button
    cy.get('a[href="/view_cart"]').first().click({ force: true });

    // 13) Click 'Proceed To Checkout'
    cy.contains(/Proceed To Checkout/i).click();

    // 14) Verify Address & Review sections
    cy.contains(/Address Details/i).should("be.visible");
    cy.contains(/Review Your Order/i).should("be.visible");

    // 15) Enter comment and 'Place Order'
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

    // 18) Success message
    cy.contains(/(ORDER PLACED!|Your order has been placed successfully!)/i, {
      timeout: 15000,
    }).should("be.visible");

    // 19) Click 'Download Invoice' and verify it downloads (via direct request to href)
    cy.contains(/Download Invoice/i)
      .should("be.visible")
      .then(($a) => {
        const href = $a.attr("href") || $a.prop("href");
        expect(href, "invoice href present").to.be.a("string").and.not.be.empty;
        cy.request({
          url: href,
          encoding: "binary", // avoid string munging
          failOnStatusCode: false,
        }).then((resp) => {
          expect(resp.status).to.eq(200);
          const cd = resp.headers["content-disposition"] || "";
          expect(cd.toLowerCase()).to.include("attachment");
          expect(resp.body.length, "invoice content length").to.be.greaterThan(
            0
          );
        });
      });

    // 20) Click 'Continue' button
    cy.contains(/Continue/i).click({ force: true });

    // 21) Click 'Delete Account'
    cy.contains("Delete Account").click();

    // 22) Verify 'ACCOUNT DELETED!' and click 'Continue'
    cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });
  });
});
