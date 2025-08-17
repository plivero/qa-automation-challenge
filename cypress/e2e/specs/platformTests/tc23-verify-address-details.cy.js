// Test Case 23: Verify address details in checkout page

describe("UI Platform - TC23: Verify address details in checkout", () => {
  it("checks delivery & billing addresses match the signup data", () => {
    // --- signup data (o que esperamos ver no checkout) ---
    const first = "Addr";
    const last = "User";
    const fullName = `${first} ${last}`;
    const email = `tc23_${Date.now()}@example.com`;
    const password = "123456";
    const company = "QA Co";
    const address1 = "Street 123";
    const address2 = "Suite 4";
    const country = "India";
    const state = "ON";
    const city = "City";
    const zipcode = "A1B2C3";
    const mobile = "1234567890";

    // 1) Launch browser
    cy.visit("/");

    // 2) (baseUrl)

    // 3) Home visível
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Click 'Signup / Login'
    cy.get('a[href="/login"]').first().click({ force: true });
    cy.location("pathname").should("include", "/login");

    // 5) Signup + criar conta
    cy.contains("New User Signup!").should("be.visible");
    cy.get('[data-qa="signup-name"]').type(fullName);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains(/ENTER ACCOUNT INFORMATION/i, { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("December");
    cy.get('[data-qa="years"]').select("1990");
    cy.get('[data-qa="first_name"]').type(first);
    cy.get('[data-qa="last_name"]').type(last);
    cy.get('[data-qa="company"]').type(company);
    cy.get('[data-qa="address"]').type(address1);
    cy.get('[data-qa="address2"]').type(address2);
    cy.get('[data-qa="country"]').select(country);
    cy.get('[data-qa="state"]').type(state);
    cy.get('[data-qa="city"]').type(city);
    cy.get('[data-qa="zipcode"]').type(zipcode);
    cy.get('[data-qa="mobile_number"]').type(mobile);
    cy.get('[data-qa="create-account"]').click();

    // 6) 'ACCOUNT CREATED!' + Continue
    cy.contains(/ACCOUNT CREATED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });

    // 7) 'Logged in as'
    cy.contains(/Logged in as/i).should("contain.text", fullName);

    // 8) Add product
    cy.get('a[href="/products"]').first().click({ force: true });
    cy.location("pathname").should("include", "/products");
    cy.get(".features_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });

    // 9) 'Cart'
    cy.contains(/View Cart/i, { timeout: 10000 }).click();

    // 10) Cart page
    cy.location("pathname").should("eq", "/view_cart");

    // 11) Proceed To Checkout
    cy.contains(/Proceed To Checkout/i).click();

    // 12) Delivery address = dados do signup (seleciona o <ul>, não o <li> do título)
    const mustHave = [fullName, address1, city, state, zipcode, country];

    // tenta por id direto; se não houver, usa o título e sobe pro <ul>
    cy.get("ul#address_delivery").then(($ul) => {
      if ($ul.length) {
        cy.wrap($ul).as("deliveryBox");
      } else {
        cy.contains("li.address_title", /Your delivery address/i)
          .closest("ul")
          .as("deliveryBox");
      }
    });

    mustHave.forEach((txt) => {
      cy.get("@deliveryBox").should("contain.text", txt);
    });

    // 13) Billing address = dados do signup
    cy.get("ul#address_invoice").then(($ul) => {
      if ($ul.length) {
        cy.wrap($ul).as("billingBox");
      } else {
        cy.contains("li.address_title", /Your billing address/i)
          .closest("ul")
          .as("billingBox");
      }
    });

    mustHave.forEach((txt) => {
      cy.get("@billingBox").should("contain.text", txt);
    });

    // 14) Delete Account
    cy.contains("Delete Account").click();

    // 15) 'ACCOUNT DELETED!' + Continue
    cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });
  });
});
