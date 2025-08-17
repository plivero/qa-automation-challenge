// Test Case 7: Verify Test Cases Page

describe("UI Platform - TC7: Verify Test Cases page", () => {
  it("navigates to the Test Cases page successfully", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Home visible (stable checks, no navbar .active)
    cy.location("pathname").should("eq", "/");
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");
    cy.contains(
      /Full-Fledged practice website for Automation Engineers/i
    ).should("be.visible");

    // 4) Click on 'Test Cases' button
    cy.get('a[href="/test_cases"]').first().click({ force: true });

    // 5) Verify user is on Test Cases page
    cy.location("pathname", { timeout: 10000 }).should("eq", "/test_cases");
    cy.contains(/Test Cases/i).should("be.visible");
    cy.contains(/Test Case 1:\s*Register User/i).should("be.visible"); // sanity content check
  });
});
