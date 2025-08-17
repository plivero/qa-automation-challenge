// Test Case 26: Verify Scroll Up *without* 'Arrow' button and Scroll Down functionality

describe("UI Platform - TC26: Scroll Down & manual Scroll Up (no arrow)", () => {
  it("scrolls to bottom, verifies 'SUBSCRIPTION', scrolls back to top without using arrow", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Verify home page is visible
    cy.get('img[src="/static/images/home/logo.png"]').should("be.visible");

    // 4) Scroll down to bottom
    cy.scrollTo("bottom", { duration: 600 });

    // 5) Verify 'SUBSCRIPTION' is visible
    cy.contains(/SUBSCRIPTION/i).should("be.visible");

    // 6) Scroll up to top (no arrow click)
    cy.scrollTo("top", { duration: 600 });

    // 7) Verify page is at top and hero text is visible
    cy.contains(
      /Full-Fledged practice website for Automation Engineers/i
    ).should("be.visible");
    cy.window().its("scrollY").should("be.lte", 5);
  });
});
