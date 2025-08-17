// cypress/e2e/platformTests/tc17-remove-product.cy.js
// Test Case 17: Remove Products From Cart

describe("UI Platform - TC17: Remove product from cart", () => {
  it("adds a product, opens cart, removes it and verifies it's gone", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home visible
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Add products to cart (add first product)
    cy.get('a[href="/products"]').first().click({ force: true });
    cy.location("pathname").should("eq", "/products");
    cy.get(".features_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });

    // 5) Click 'Cart' button
    cy.contains(/View Cart/i, { timeout: 10000 }).click();

    // 6) Verify cart page is displayed
    cy.location("pathname").should("eq", "/view_cart");

    // 7) Click 'X' button corresponding to the product
    cy.get("#cart_info_table tbody tr").should("have.length.greaterThan", 0);
    cy.get("#cart_info_table tbody tr")
      .first()
      .within(() => {
        cy.get(".cart_quantity_delete").click({ force: true });
      });

    // 8) Verify the product is removed from the cart
    cy.get("#cart_info_table tbody tr", { timeout: 10000 }).should(
      "have.length",
      0
    );
    cy.contains(/Cart is empty/i).should("be.visible");
  });
});
