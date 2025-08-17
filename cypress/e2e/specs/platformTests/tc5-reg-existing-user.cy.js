// Test Case 5: Register User with existing email

describe("UI Platform - TC5: Register with existing email", () => {
  it("shows 'Email Address already exist!' error", () => {
    const email = Cypress.env("USER_EMAIL");
    if (!email) throw new Error("USER_EMAIL not set in cypress.env.json");

    // 1–2) Open site (home)
    cy.visit("/");

    // 3) Home visible (logo)
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click 'Signup / Login'
    cy.get('a[href="/login"]').first().click({ force: true });

    // 5) 'New User Signup!' visible
    cy.location("pathname", { timeout: 10000 }).should("include", "/login");
    cy.contains("New User Signup!").should("be.visible");

    // 6) Enter name + existing email
    cy.get('[data-qa="signup-name"]').type("Already User");
    cy.get('[data-qa="signup-email"]').type(email);

    // 7) Click 'Signup'
    cy.get('[data-qa="signup-button"]').click();

    // 8) Error visible
    cy.contains(/Email Address already exist!?/i).should("be.visible");
  });
});
