// Test Case 4: Logout User (compact + all steps)

describe("UI Platform - TC4: Logout User", () => {
  it("logs in and logs out (steps 1–10)", () => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");
    if (!email || !password)
      throw new Error("USER_EMAIL/USER_PASSWORD missing in env");

    // 1–2) Open home
    cy.visit("/");

    // 3) Home visible
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click 'Signup / Login'
    cy.get('a[href="/login"]').first().click({ force: true });

    // 5) 'Login to your account' visible
    cy.location("pathname", { timeout: 10000 }).should("include", "/login");
    cy.contains("Login to your account").should("be.visible");

    // 6) Enter correct email & password
    cy.get('[data-qa="login-email"]').clear().type(email);
    cy.get('[data-qa="login-password"]').clear().type(password, { log: false });

    // 7) Click 'login'
    cy.get('[data-qa="login-button"]').click();

    // 8) 'Logged in as <username>' visible (name-agnostic)
    cy.contains(/Logged in as/i).should("be.visible");

    // 9) Click 'Logout'
    cy.contains("Logout").click();

    // 10) Navigated back to login page
    cy.location("pathname").should("include", "/login");
    cy.contains("Login to your account").should("be.visible");
  });
});
