// cypress/e2e/platformTests/tc9-search-product.cy.js
// Test Case 9: Search Product

describe("UI Platform - TC9: Search Product", () => {
  it("searches by keyword and shows related products", () => {
    const term = "dress";

    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home page is visible
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click on 'Products' button
    cy.get('a[href="/products"]').first().click({ force: true });

    // 5) Verify user is navigated to ALL PRODUCTS page
    cy.location("pathname", { timeout: 10000 }).should("eq", "/products");
    cy.contains(/All Products/i).should("be.visible");

    // 6) Enter product name and click search
    cy.get("#search_product").clear().type(term);
    cy.get("#submit_search").click();

    // 7) Verify 'SEARCHED PRODUCTS' is visible
    cy.contains(/Searched Products/i, { timeout: 10000 }).should("be.visible");

    // 8) Verify all related products are visible
    cy.get(".features_items .product-image-wrapper")
      .should("have.length.greaterThan", 0)
      .each(($card) => cy.wrap($card).should("be.visible"));
  });
});
