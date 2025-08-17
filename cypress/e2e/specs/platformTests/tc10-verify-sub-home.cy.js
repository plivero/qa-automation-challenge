// Test Case 10: Verify Subscription in home page

describe("UI Platform - TC10: Subscription (home footer)", () => {
  it("subscribes from the home page footer", () => {
    const email = `sub_${Date.now()}@example.com`;

    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Verify that home page is visible successfully
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Scroll down to footer
    cy.scrollTo("bottom");
    // or: cy.get("footer").scrollIntoView();

    // 5) Verify text 'SUBSCRIPTION'
    cy.contains(/SUBSCRIPTION/i, { timeout: 10000 }).should("be.visible");

    // 6) Enter email address in input and click arrow button
    cy.get("#susbscribe_email").clear().type(email); // note: site uses 'susbscribe' (typo) id
    cy.get("#subscribe").click({ force: true });

    // 7) Verify success message
    cy.contains("You have been successfully subscribed!", {
      timeout: 10000,
    }).should("be.visible");
  });
});
