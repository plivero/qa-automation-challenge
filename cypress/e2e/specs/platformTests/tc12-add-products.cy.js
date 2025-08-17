// Test Case 12: Add Products in Cart

describe("UI Platform - TC12: Add Products in Cart", () => {
  it("adds two products and verifies prices, quantity and totals", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home visible
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click 'Products'
    cy.get('a[href="/products"]').first().click({ force: true });

    // 5) On ALL PRODUCTS page
    cy.location("pathname").should("eq", "/products");
    cy.contains(/All Products/i).should("be.visible");

    // 5/6) Hover first product and add to cart → Continue Shopping
    cy.get(".features_items .product-image-wrapper").eq(0).trigger("mouseover");
    cy.get(".features_items .product-image-wrapper")
      .eq(0)
      .within(() => cy.contains(/Add to cart/i).click({ force: true }));
    cy.contains(/Continue Shopping/i, { timeout: 10000 }).click();

    // 7) Hover second product and add to cart
    cy.get(".features_items .product-image-wrapper").eq(1).trigger("mouseover");
    cy.get(".features_items .product-image-wrapper")
      .eq(1)
      .within(() => cy.contains(/Add to cart/i).click({ force: true }));

    // 8) Click 'View Cart'
    cy.contains(/View Cart/i, { timeout: 10000 }).click();

    // 9) Verify both products are in the cart
    cy.location("pathname").should("eq", "/view_cart");
    cy.get("#cart_info_table tbody tr").should("have.length.greaterThan", 1);

    // 10) Verify price, quantity and total (simplified)
    const num = (s) => +String(s).replace(/\D/g, ""); // extrai só dígitos

    const checkRow = (i) => {
      cy.get("#cart_info_table tbody tr")
        .eq(i)
        .then(($tr) => {
          const price = num($tr.find("td.cart_price p").text());
          const qty = num($tr.find("td.cart_quantity").text());
          const total = num($tr.find("td.cart_total p").text());

          expect(price, "price > 0").to.be.gt(0);
          expect(qty, "qty > 0").to.be.gt(0);
          expect(total, "total = price * qty").to.eq(price * qty);
        });
    };

    checkRow(0);
    checkRow(1);
  });
});
