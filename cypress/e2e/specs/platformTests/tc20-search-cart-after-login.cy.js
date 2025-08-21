// Test Case 20: Search Products and Verify Cart After Login

describe("UI Platform - TC20: Search products and verify cart after login", () => {
  it("keeps searched items in cart after logging in", () => {
    const term = (Cypress.env("SEARCH_TERM") || "dress").toLowerCase();
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");
    const name = Cypress.env("USER_NAME") || "UI Tester";

    // (precondition) create user if not existing
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
        cy.request({
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

    // 1) Launch browser
    cy.visit("/");

    // 2) (baseUrl already covers)

    // 3) Click on 'Products' button
    cy.get('a[href="/products"]').first().click({ force: true });

    // 4) Verify ALL PRODUCTS page
    cy.location("pathname").should("include", "/products");
    cy.contains(/All Products/i).should("be.visible");

    // 5) Enter product name and click search
    cy.get("#search_product").clear().type(term);
    cy.get("#submit_search").click();

    // 6) Verify 'SEARCHED PRODUCTS' is visible
    cy.contains(/Searched Products/i).should("be.visible");

    // 7) Verify results are related (tolerant: >= 1 match)
    cy.get(".features_items .productinfo p")
      .should("have.length.greaterThan", 0)
      .then(($ps) => {
        const names = $ps
          .toArray()
          .map((el) => el.innerText.trim().toLowerCase());
        cy.log(`results: ${names.join(" | ")}`);
        const variants = new Set([
          term,
          term.endsWith("s") ? term.slice(0, -1) : `${term}s`,
        ]);
        const matchCount = names.filter((n) =>
          [...variants].some((t) => n.includes(t))
        ).length;
        expect(
          matchCount,
          `at least one result should match '${[...variants].join("' or '")}'`
        ).to.be.greaterThan(0);
      });

    // 8) Add first 2 results to cart
    cy.get(".features_items .product-image-wrapper").then(($cards) => {
      const count = Math.min($cards.length, 2);
      for (let i = 0; i < count; i++) {
        cy.get(".features_items .product-image-wrapper")
          .eq(i)
          .within(() => cy.contains(/Add to cart/i).click({ force: true }));
        if (i < count - 1)
          cy.contains(/Continue Shopping/i, { timeout: 10000 }).click();
      }
      cy.contains(/View Cart/i, { timeout: 10000 }).click();
    });

    // 9) Verify products are visible in cart
    cy.location("pathname").should("eq", "/view_cart");
    cy.get("#cart_info_table tbody tr").should("have.length.greaterThan", 0);

    // 10) Click 'Signup / Login' and submit login details
    cy.get('a[href="/login"]').first().click({ force: true });
    cy.location("pathname").should("include", "/login");
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { log: false });
    cy.get('[data-qa="login-button"]').click();

    // 11) Again, go to Cart page
    cy.get('a[href="/view_cart"]').first().click({ force: true });
    cy.location("pathname").should("eq", "/view_cart");

    // 12) Verify items persist after login
    cy.get("#cart_info_table tbody tr").should("have.length.greaterThan", 0);
  });
});
