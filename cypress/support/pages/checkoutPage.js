// cypress/support/pages/checkoutPage.js
// @ts-check
/// <reference types="cypress" />

export class CheckoutPage {
  getCheckoutContainer() {
    return cy.contains(/address details|review your order|checkout/i);
  }

  addOrderComment(text) {
    cy.get('textarea[name="message"]').clear().type(text);
  }

  clickPlaceOrder() {
    cy.contains(/place order/i).click({ force: true });
  }

  getOrderSuccessMessage() {
    return cy.contains(
      /your order has been placed successfully|order placed|congratulations/i
    );
  }
}
