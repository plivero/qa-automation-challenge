// Test Case 1: Register User

describe("UI Platform - TC1: Register User", () => {
  it("registers a new user and deletes the account", () => {
    const email = `ui_tc1_${Date.now()}@example.com`;
    const fullName = "Test User";

    // 1–3) Open home & verify
    cy.visit("/");
    cy.get('img[src="/static/images/home/logo.png"]', {
      timeout: 10000,
    }).should("be.visible");

    // 4) Click 'Signup / Login'
    cy.get('a[href="/login"]').first().click({ force: true });

    // 5) 'New User Signup!' is visible
    cy.location("pathname").should("include", "/login");
    cy.contains("New User Signup!").should("be.visible");

    // 6–7) Enter name/email and click 'Signup'
    cy.get('[data-qa="signup-name"]').type(fullName);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // 8) 'ENTER ACCOUNT INFORMATION' visible
    cy.contains(/ENTER ACCOUNT INFORMATION/i, { timeout: 10000 }).should(
      "be.visible"
    );

    // 9) Fill Title/Password/DOB
    cy.get("#id_gender1").check({ force: true });
    cy.get('[data-qa="password"]').type("123456");
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("December");
    cy.get('[data-qa="years"]').select("1990");

    // 10–11) Check both checkboxes
    cy.get("#newsletter").check({ force: true });
    cy.get("#optin").check({ force: true });

    // 12) Fill remaining details
    cy.get('[data-qa="first_name"]').type("Test");
    cy.get('[data-qa="last_name"]').type("User");
    cy.get('[data-qa="company"]').type("UI Co");
    cy.get('[data-qa="address"]').type("Street 123");
    cy.get('[data-qa="address2"]').type("Suite 4");
    cy.get('[data-qa="country"]').select("Canada");
    cy.get('[data-qa="state"]').type("ON");
    cy.get('[data-qa="city"]').type("Toronto");
    cy.get('[data-qa="zipcode"]').type("A1B2C3");
    cy.get('[data-qa="mobile_number"]').type("+1234567890");

    // 13) Create Account
    cy.get('[data-qa="create-account"]').click();

    // 14) 'ACCOUNT CREATED!' visible
    cy.contains(/ACCOUNT CREATED!/i, { timeout: 10000 }).should("be.visible");

    // 15) Click 'Continue'
    cy.get('[data-qa="continue-button"]').click({ force: true });

    // 16) 'Logged in as username' visible
    cy.contains("Logged in as").should("contain.text", "Test User");

    // 17) Click 'Delete Account'
    cy.contains("Delete Account").click();

    // 18) 'ACCOUNT DELETED!' visible and click 'Continue'
    cy.contains(/ACCOUNT DELETED!/i, { timeout: 10000 }).should("be.visible");
    cy.get('[data-qa="continue-button"]').click({ force: true });
  });
});
