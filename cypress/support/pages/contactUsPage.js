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

  getGetInTouchHeader() {
    return cy.contains(/GET IN TOUCH/i, { timeout: 10000 });
  }

  fillForm({ name, email, subject, message }) {
    this.form().within(() => {
      cy.get('[data-qa="name"]').clear().type(name);
      cy.get('[data-qa="email"]').clear().type(email);
      cy.get('[data-qa="subject"]').clear().type(subject);
      cy.get('[data-qa="message"]').clear().type(message);
    });
  }

  attachTextFile({ contents, fileName }) {
    this.form()
      .find('input[type="file"]')
      .selectFile({
        contents: new Blob([contents], { type: "text/plain" }),
        fileName,
        lastModified: Date.now(),
      });
  }

  submit() {
    this.form().find('[data-qa="submit-button"]').click();
  }

  getSuccessMessage() {
    return cy.contains(
      /Success! Your details have been submitted successfully\./i
    );
  }

  fillWithDefaults() {
    const name = Cypress.env("USER_NAME");
    const email = Cypress.env("USER_EMAIL");

    this.fillForm({
      name,
      email,
      subject: "QA UI - Contact",
      message: "Message sent by Cypress (UI).",
    });
  }

  fillAttachAndSubmitWithDefaults() {
    this.fillWithDefaults();
    this.attachTextFile({
      contents: "Hello from Cypress!",
      fileName: "contact-note.txt",
    });
    this.submit();
  }

  // helper encapsulating step 11
  goBackHomeAndVerify() {
    cy.contains("Home").click();
    cy.title().should("eq", "Automation Exercise");
  }
}
