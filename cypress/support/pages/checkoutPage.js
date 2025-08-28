// cypress/support/pages/checkoutPage.js
// @ts-check
/// <reference types="cypress" />

export class CheckoutPage {
  // Generic container (kept)
  getCheckoutContainer() {
    return cy.contains(/address details|review your order|checkout/i);
  }

  // Dedicated headers (added for clarity in specs)
  getAddressDetailsHeader() {
    return cy.contains(/Address Details/i);
  }

  getReviewYourOrderHeader() {
    return cy.contains(/Review Your Order/i);
  }

  // Actions
  addOrderComment(text) {
    cy.get('textarea[name="message"]').clear().type(text);
  }

  clickPlaceOrder() {
    cy.contains(/place order/i).click({ force: true });
  }

  // Legacy success getter (kept; some specs may use this)
  getOrderSuccessMessage() {
    return cy.contains(
      /your order has been placed successfully|order placed|congratulations/i
    );
  }

  clickDownloadInvoice() {
    cy.contains(/Download Invoice/i)
      .should("be.visible")
      .click();
  }
}
