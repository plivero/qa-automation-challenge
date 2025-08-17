// Test Case 22: Add to cart from Recommended items

describe("UI Platform - TC22: Add to cart from Recommended items", () => {
  it("adds a recommended product and verifies it in the cart", () => {
    // 1) Launch browser
    cy.visit("/");

    // 2) Navigate to url (baseUrl already applied)

    // 3) Scroll to bottom of page
    cy.scrollTo("bottom", { duration: 500 });

    // 4) Verify 'RECOMMENDED ITEMS' are visible
    cy.contains(/RECOMMENDED ITEMS/i).should("be.visible");
    cy.get(".recommended_items").should("be.visible");

    // Capture the first recommended product name (to assert later)
    cy.get(".recommended_items .productinfo p")
      .first()
      .invoke("text")
      .then((t) => cy.wrap(t.trim()).as("recName"));

    // 5) Click on 'Add To Cart' on a Recommended product (first)
    cy.get(".recommended_items .product-image-wrapper")
      .first()
      .within(() => {
        cy.contains(/Add to cart/i).click({ force: true });
      });

    // 6) Click on 'View Cart' button (from modal)
    cy.contains(/View Cart/i, { timeout: 10000 }).click();

    // 7) Verify that product is displayed in cart page
    cy.location("pathname").should("eq", "/view_cart");
    cy.get("#cart_info_table tbody tr").should("have.length.greaterThan", 0);
    cy.get("@recName").then((name) => {
      cy.get("#cart_info_table").should("contain.text", name);
    });
  });
});
