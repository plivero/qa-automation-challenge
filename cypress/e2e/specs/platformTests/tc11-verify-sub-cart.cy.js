// Test Case 11: Verify Subscription in Cart page

describe("UI Platform - TC11: Subscription (cart footer)", () => {
  it("subscribes from the Cart page footer", () => {
    const email = `sub_cart_${Date.now()}@example.com`;

    // 1–3) Launch & verify home
    cy.visit("/");
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click 'Cart' button
    cy.get('a[href="/view_cart"]').first().click({ force: true });

    // 5) Scroll down to footer
    cy.location("pathname", { timeout: 10000 }).should("eq", "/view_cart");
    cy.scrollTo("bottom");

    // 6) Verify text 'SUBSCRIPTION'
    cy.contains(/SUBSCRIPTION/i, { timeout: 10000 }).should("be.visible");

    // 7) Enter email and click arrow button
    cy.get("#susbscribe_email").clear().type(email); // site id typo: 'susbscribe'
    cy.get("#subscribe").click({ force: true });

    // 8) Verify success message
    cy.contains("You have been successfully subscribed!", {
      timeout: 10000,
    }).should("be.visible");
  });
});
