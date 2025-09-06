describe("UI Platform - TC8: Verify All Products & product detail", () => {
  it("opens All Products and validates first product detail", () => {
    // Step 1: Launch browser
    // (handled by Cypress runner)

    // Step 2: Navigate to url 'http://automationexercise.com'
    cy.visit("/");

    // Step 3: Verify that home page is visible successfully
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // Step 4: Click on 'Products' button
    cy.get('a[href="/products"]').first().click();

    // Step 5: Verify user is navigated to ALL PRODUCTS page
    cy.location("pathname").should("eq", "/products");
    cy.contains(/All Products/i).should("be.visible");

    // Step 6: Verify the products list is visible
    cy.get(".features_items .product-image-wrapper")
      .its("length")
      .should("be.gt", 0);

    // Step 7: Click on 'View Product' of first product
    cy.get('a[href*="/product_details/"]').first().click();

    // Step 8: Verify landed to product detail page
    cy.location("pathname").should("match", /\/product_details\/\d+/);

    // Step 9: Verify detail info: name, category, price, availability, condition, brand
    cy.get(".product-information h2").should("be.visible").and("not.be.empty");
    cy.contains(/Category:/i).should("be.visible");
    cy.contains(/Rs\.\s*\d+/i).should("be.visible"); // price
    cy.contains(/Availability:/i).should("be.visible");
    cy.contains(/Condition:/i).should("be.visible");
    cy.contains(/Brand:/i).should("be.visible");
  });
});
