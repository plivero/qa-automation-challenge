// Test Case 3: Login User with incorrect email and password

describe("UI Platform - TC3: Login with incorrect credentials", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("shows an error when email and password are incorrect", () => {
    // 1–2) Launch & navigate
    cy.visit("/");

    // 3) Verify that home page is visible successfully
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click on 'Signup / Login' button
    cy.contains("Signup / Login").click();

    // 5) Verify 'Login to your account' is visible
    cy.contains("Login to your account").should("be.visible");

    // 6) Enter incorrect email address and password
    cy.get('[data-qa="login-email"]')
      .clear()
      .type(`wrong_${Date.now()}@example.com`);
    cy.get('[data-qa="login-password"]')
      .clear()
      .type("wrong-pass", { log: false });

    // 7) Click 'login' button
    cy.get('[data-qa="login-button"]').click();

    // 8) Verify error 'Your email or password is incorrect!' is visible
    cy.contains("Your email or password is incorrect!").should("be.visible");
  });
});
