// Test Case 6: Contact Us Form (lean & reliable)

describe("UI Platform - TC6: Contact Us", () => {
  it("submits the contact form successfully", () => {
    const name = Cypress.env("USER_NAME") || "QA User";
    const email = Cypress.env("USER_EMAIL") || `qa_${Date.now()}@example.com`;

    // 1–4) Launch, navigate, and open Contact Us
    cy.visit("/");
    cy.get('a[href="/contact_us"]').first().click({ force: true });

    // 5) Verify 'GET IN TOUCH' is visible
    cy.location("pathname", { timeout: 10000 }).should("eq", "/contact_us");
    cy.contains(/GET IN TOUCH/i, { timeout: 10000 }).should("be.visible");

    // 6) Fill the form
    cy.get('[data-qa="name"]').type(name);
    cy.get('[data-qa="email"]').type(email);
    cy.get('[data-qa="subject"]').type("QA UI - Contact");
    cy.get('[data-qa="message"]').type("Message sent by Cypress (UI).");

    // 7) Upload file
    const contents = "Hello from Cypress!";
    cy.get('input[type="file"]').selectFile({
      contents: new Blob([contents], { type: "text/plain" }),
      fileName: "contact-note.txt",
      lastModified: Date.now(),
    });

    // 8) Submit
    cy.get('[data-qa="submit-button"]').click();

    // 10) Success message is visible (primary assertion)
    cy.contains(
      "Success! Your details have been submitted successfully."
    ).should("be.visible");

    // 11) Click Home and confirm we’re back
    cy.contains("Home").click();
    cy.title().should("eq", "Automation Exercise");
  });
});
