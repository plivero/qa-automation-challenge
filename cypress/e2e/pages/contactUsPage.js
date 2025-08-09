// @ts-check
/// <reference types="cypress" />

export class ContactUsPage {
  visit() {
    cy.visit("/contact_us"); // usa baseUrl
  }

  // pega o formulário certo (evita confundir com o footer)
  form() {
    // qualquer um desses funciona; mantenho por seletor semântico do site:
    return cy.get('form[action="/contact_us"]').first();
    // alternativa se o site mudar:
    // return cy.contains('h2', /get in touch/i).parents('div').find('form').first();
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

  assertSuccess() {
    cy.contains(
      /success! your details have been submitted successfully/i
    ).should("be.visible");
  }
}
