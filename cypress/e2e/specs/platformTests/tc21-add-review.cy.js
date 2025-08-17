// Test Case 21: Add review on product

describe("UI Platform - TC21: Add review on product", () => {
  it("submits a review and sees the success message", () => {
    const name = "Review Bot";
    const email = `rev_${Date.now()}@example.com`;
    const text = "Nice quality! Automated review.";

    // 1) Launch browser
    cy.visit("/");

    // 2) Navigate to url (baseUrl already used)

    // 3) Click on 'Products' button
    cy.get('a[href="/products"]').first().click({ force: true });

    // 4) Verify user is navigated to ALL PRODUCTS page successfully
    cy.location("pathname").should("include", "/products");
    cy.contains(/All Products/i).should("be.visible");

    // 5) Click on 'View Product' button (first product)
    cy.contains("a", /View Product/i)
      .first()
      .click({ force: true });

    // 6) Verify 'Write Your Review' is visible
    cy.contains(/Write Your Review/i).should("be.visible");

    // 7) Enter name, email and review
    cy.get("#name").clear().type(name);
    cy.get("#email").clear().type(email);
    cy.get("#review").clear().type(text);

    // 8) Click 'Submit' button
    cy.get("#button-review").click({ force: true });

    // 9) Verify success message 'Thank you for your review.'
    cy.contains(/Thank you for your review/i, { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
