// @ts-check
/// <reference types="cypress" />

export class AddressPage {
  getDeliveryBox() {
    return cy.get("ul#address_delivery");
  }

  getBillingBox() {
    return cy.get("ul#address_invoice");
  }
}
