// @ts-check
/// <reference types="cypress" />

export class PaymentPage {
  assertOnPayment() {
    cy.contains(/payment|payment details/i).should("be.visible");
  }

  fillAndPay({ name, number, cvc, month, year }) {
    cy.get('[name="name_on_card"], [data-qa="name-on-card"]')
      .clear()
      .type(name);
    cy.get('[name="card_number"], [data-qa="card-number"]')
      .clear()
      .type(number);
    cy.get('[name="cvc"], [data-qa="cvc"]').clear().type(cvc);
    cy.get('[name="expiry_month"], [data-qa="expiry-month"]')
      .clear()
      .type(month);
    cy.get('[name="expiry_year"], [data-qa="expiry-year"]').clear().type(year);

    cy.contains(
      'button, input[type="submit"]',
      /pay|pay and confirm order/i
    ).click({ force: true });
  }
}
