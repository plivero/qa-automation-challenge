// @ts-check
/// <reference types="cypress" />

export class CheckoutPage {
  assertOnCheckout() {
    cy.contains(/address details|review your order|checkout/i).should(
      "be.visible"
    );
  }

  addOrderComment(text) {
    cy.get('textarea[name="message"]').clear().type(text);
  }

  clickPlaceOrder() {
    cy.contains(/place order/i).click({ force: true });
  }

  assertOrderSuccess() {
    cy.contains(
      /your order has been placed successfully|order placed|congratulations/i
    ).should("be.visible");
  }
}
