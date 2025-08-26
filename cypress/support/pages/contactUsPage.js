// cypress/support/pages/contactUsPage.js
// @ts-check
/// <reference types="cypress" />

export class ContactUsPage {
  visit() {
    cy.visit("/contact_us");
  }

  form() {
    return cy.get('form[action="/contact_us"]').first();
  }

  fillForm({ name, email, subject, message }) {
    this.form().within(() => {
      cy.get('[data-qa="name"]').clear().type(name);
      cy.get('[data-qa="email"]').clear().type(email);
      cy.get('[data-qa="subject"]').clear().type(subject);
      cy.get('[data-qa="message"]').clear().type(message);
    });
  }

  submit() {
    this.form().find('[type="submit"]').click();
  }

  // NEW: helper to fill + submit with env/default values
  fillAndSubmitWithDefaults() {
    const name = Cypress.env("USER_NAME") || "QA User";
    const email = Cypress.env("USER_EMAIL") || "qa@example.com";
    const subject = "Automation Exercise - Contact";
    const message = "Test message sent by Cypress.";

    this.fillForm({ name, email, subject, message });
    this.submit();
  }

  getSuccessMessage() {
    return cy.contains(
      /success! your details have been submitted successfully/i
    );
  }
}
