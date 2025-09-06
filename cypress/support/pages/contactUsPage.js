// cypress/support/pages/contactUsPage.js
// @ts-check
/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class ContactUsPage {
  elements = {
    form: () => cy.get('form[action="/contact_us"]'),
    header: () => cy.get("div.contact-form > .title"),
    name: () => cy.get('[data-qa="name"]'),
    email: () => cy.get('[data-qa="email"]'),
    subject: () => cy.get('[data-qa="subject"]'),
    message: () => cy.get('[data-qa="message"]'),
    submit: () => cy.get('[data-qa="submit-button"]'),
    success: () =>
      cy.contains("Success! Your details have been submitted successfully."),
    home: () => cy.contains("Home"),
  };

  visit() {
    cy.visit("/contact_us");
  }

  // versão nova simplificada
  getHeader() {
    return this.elements.header();
  }

  fillForm({ name, email, subject, message }) {
    this.elements.name().type(name);
    this.elements.email().type(email);
    this.elements.subject().type(subject);
    this.elements.message().type(message);
  }

  submit() {
    this.elements.submit().click();
  }

  getSuccessMessage() {
    return this.elements.success();
  }

  goHome() {
    this.elements.home().click();
  }

  // ---------- "apelidos" p/ compatibilidade com as specs ----------
  getGetInTouchHeader() {
    return this.getHeader();
  }

  fillAttachAndSubmitWithDefaults() {
    // agora usando faker 💥
    this.fillForm({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.lorem.words(3),
      message: faker.lorem.sentence(),
    });
    this.submit();
  }

  goBackHomeAndVerify() {
    this.goHome();
    cy.title().should("eq", "Automation Exercise");
  }
}
