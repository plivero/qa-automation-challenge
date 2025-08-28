// cypress/support/pages/paymentPage.js
// @ts-check
/// <reference types="cypress" />

export class PaymentPage {
  // Getter to find a payment-related container/marker
  getPaymentContainer() {
    return cy.contains(/payment|payment details/i);
  }

  // Low-level: fill card fields only (no click)
  fillFields({ name, number, cvc, month, year }) {
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
  }

  // Low-level: click the pay/confirm button only
  clickPay() {
    cy.contains(
      'button, input[type="submit"]',
      /pay|pay and confirm order/i
    ).click({ force: true });
  }

  // High-level: fill + click (kept for convenience)
  fillAndPay({ name, number, cvc, month, year }) {
    this.fillFields({ name, number, cvc, month, year });
    this.clickPay();
  }

  // No-args helper: reads env or uses safe defaults (spec stays clean)
  payWithDefaults() {
    const name = Cypress.env("USER_NAME") || "QA User";
    const card = Cypress.env("CARD_NUMBER") || "4111111111111111";
    const cvc = Cypress.env("CARD_CVC") || "123";
    const month = Cypress.env("CARD_EXP_MONTH") || "12";
    const year = Cypress.env("CARD_EXP_YEAR") || "2030";

    this.fillAndPay({ name, number: card, cvc, month, year });
  }

  // Convenience: standard test card (keeps specs ultra-simple)
  payWithTestCard() {
    this.fillAndPay({
      name: "QA Test",
      number: "4111111111111111",
      cvc: "123",
      month: "12",
      year: "2026",
    });
  }

  // Success message after payment (varies by site copy)
  getOrderPlacedMessage() {
    return cy.contains(
      /(ORDER PLACED!|Your order has been placed successfully!)/i,
      { timeout: 15000 }
    );
  }
  // Download button
  getDownloadInvoiceButton() {
    return cy.contains(/Download Invoice/i);
  }

  // Click download button
  clickDownloadInvoiceButton() {
    this.getDownloadInvoiceButton().click();
  }
}
