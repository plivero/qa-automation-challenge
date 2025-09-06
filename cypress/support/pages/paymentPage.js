// cypress/support/pages/paymentPage.js
// @ts-check
/// <reference types="cypress" />

export class PaymentPage {
  elements = {
    paymentContainer: () => cy.contains(/payment|payment details/i),

    nameOnCard: () => cy.get('[name="name_on_card"], [data-qa="name-on-card"]'),
    cardNumber: () => cy.get('[name="card_number"], [data-qa="card-number"]'),
    cvc: () => cy.get('[name="cvc"], [data-qa="cvc"]'),
    expiryMonth: () =>
      cy.get('[name="expiry_month"], [data-qa="expiry-month"]'),
    expiryYear: () => cy.get('[name="expiry_year"], [data-qa="expiry-year"]'),

    payButton: () =>
      cy.contains('button, input[type="submit"]', /pay|pay and confirm order/i),

    orderPlacedMessage: () =>
      cy.contains(/(ORDER PLACED!|Your order has been placed successfully!)/i, {
        timeout: 15000,
      }),

    downloadInvoiceButton: () => cy.contains(/Download Invoice/i),
  };

  fillFields({ name, number, cvc, month, year }) {
    this.elements.nameOnCard().clear().type(name);
    this.elements.cardNumber().clear().type(number);
    this.elements.cvc().clear().type(cvc);
    this.elements.expiryMonth().clear().type(month);
    this.elements.expiryYear().clear().type(year);
  }

  clickPay() {
    this.elements.payButton().click({ force: true });
  }

  fillAndPay({ name, number, cvc, month, year }) {
    this.fillFields({ name, number, cvc, month, year });
    this.clickPay();
  }

  payWithDefaults() {
    const name = Cypress.env("USER_NAME") || "QA User";
    const card = Cypress.env("CARD_NUMBER") || "4111111111111111";
    const cvc = Cypress.env("CARD_CVC") || "123";
    const month = Cypress.env("CARD_EXP_MONTH") || "12";
    const year = Cypress.env("CARD_EXP_YEAR") || "2030";

    this.fillAndPay({ name, number: card, cvc, month, year });
  }

  payWithTestCard() {
    this.fillAndPay({
      name: "QA Test",
      number: "4111111111111111",
      cvc: "123",
      month: "12",
      year: "2026",
    });
  }

  getOrderPlacedMessage() {
    return this.elements.orderPlacedMessage();
  }
  getDownloadInvoiceButton() {
    return this.elements.downloadInvoiceButton();
  }
  clickDownloadInvoiceButton() {
    this.elements.downloadInvoiceButton().click();
  }
}
