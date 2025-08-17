// Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality

describe("UI Platform - TC25: Scroll Down & Arrow Scroll Up", () => {
  it("scrolls to bottom, verifies 'SUBSCRIPTION', uses arrow to scroll up", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home visible
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Scroll down page to bottom
    cy.scrollTo("bottom", { duration: 600 });

    // 5) Verify 'SUBSCRIPTION' is visible
    cy.contains(/SUBSCRIPTION/i).should("be.visible");

    // 6) Click on arrow at bottom right to move upward
    cy.get("#scrollUp", { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });

    // 7) Verify page is scrolled up and hero text is visible on screen
    cy.contains(
      /Full-Fledged practice website for Automation Engineers/i
    ).should("be.visible");
    cy.window().its("scrollY").should("be.lte", 5); // near top
  });
});
