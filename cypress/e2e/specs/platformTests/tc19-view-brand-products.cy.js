// Test Case 19: View & Cart Brand Products

describe("UI Platform - TC19: View & Cart Brand Products", () => {
  it("opens two brand pages from the sidebar", () => {
    // 1) Launch browser
    cy.visit("/");

    // 2) Navigate to url (baseUrl already applied)

    // 3) Click on 'Products' button
    cy.get('a[href="/products"]').first().click({ force: true });
    cy.location("pathname").should("include", "/products");

    // 4) Verify that Brands are visible on left side bar
    cy.get(".brands_products")
      .should("be.visible")
      .and("contain.text", "Brands");

    // 5) Click on any brand name (first)
    cy.get(".brands_products a").its("length").should("be.gt", 0);
    cy.get(".brands_products a").first().click({ force: true });

    // 6) Verify brand page is displayed and products are shown
    cy.location("pathname").should("include", "/brand_products");
    cy.contains(/BRAND\s*-\s*.*\s*PRODUCTS/i).should("be.visible");
    cy.get(".features_items").should("be.visible");

    // 7) On left side bar, click on any other brand link (second)
    cy.get(".brands_products a").its("length").should("be.gt", 1);
    cy.get(".brands_products a").eq(1).click({ force: true });

    // 8) Verify user is navigated to that brand page and can see products
    cy.location("pathname").should("include", "/brand_products");
    cy.contains(/BRAND\s*-\s*.*\s*PRODUCTS/i).should("be.visible");
    cy.get(".features_items").should("be.visible");
  });
});
