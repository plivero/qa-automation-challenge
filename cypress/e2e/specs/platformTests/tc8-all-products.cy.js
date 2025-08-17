// Test Case 8: Verify All Products and product detail page

describe("UI Platform - TC8: Verify All Products & product detail", () => {
  it("opens All Products and validates first product detail", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home page visible
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click on 'Products' button
    cy.get('a[href="/products"]').first().click({ force: true });

    // 5) Verify user is navigated to ALL PRODUCTS page
    cy.location("pathname", { timeout: 10000 }).should("eq", "/products");
    cy.contains(/All Products/i).should("be.visible");

    // 6) The products list is visible
    cy.get(".features_items .product-image-wrapper")
      .its("length")
      .should("be.gt", 0);

    // 7) Click on 'View Product' of first product
    cy.get('a[href*="/product_details/"]').first().click({ force: true });

    // 8) Landed to product detail page
    cy.location("pathname", { timeout: 10000 }).should(
      "match",
      /\/product_details\/\d+/
    );

    // 9) Verify detail info: name, category, price, availability, condition, brand
    cy.get(".product-information").within(() => {
      cy.get("h2").should("be.visible").invoke("text").should("not.be.empty");
      cy.contains(/Category:/i).should("be.visible");
      cy.contains(/Rs\.\s*\d+/i).should("be.visible"); // price
      cy.contains(/Availability:/i).should("be.visible");
      cy.contains(/Condition:/i).should("be.visible");
      cy.contains(/Brand:/i).should("be.visible");
    });
  });
});
