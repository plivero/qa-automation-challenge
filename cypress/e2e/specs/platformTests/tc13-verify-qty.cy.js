// Test Case 13: Verify Product quantity in Cart

describe("UI Platform - TC13: Verify Product quantity in Cart", () => {
  it("adds a product with quantity 4 and verifies it in cart", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home page visible
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Click 'View Product' for any product on home page
    cy.get('a[href*="/product_details/"]').first().click({ force: true });

    // 5) Product detail opened
    cy.location("pathname").should("match", /\/product_details\/\d+/);
    cy.get(".product-information").should("be.visible");

    // 6) Increase quantity to 4
    cy.get("#quantity").clear().type("4");

    // 7) Click 'Add to cart'
    cy.contains("button", /Add to cart/i).click({ force: true });

    // 8) Click 'View Cart'
    cy.contains(/View Cart/i, { timeout: 10000 }).click();

    // 9) Verify product is in cart with exact quantity
    cy.location("pathname").should("eq", "/view_cart");
    cy.get(".cart_quantity")
      .first()
      .should(($q) => {
        const qty = $q.text().replace(/\D/g, "");
        expect(qty).to.eq("4");
      });
  });
});
