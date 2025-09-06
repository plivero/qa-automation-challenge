// cypress/support/pages/addressPage.js
/// <reference types="cypress" />

export class AddressPage {
  elements = {
    deliveryBox: () => cy.get("ul#address_delivery"),
    billingBox: () => cy.get("ul#address_invoice"),
  };

  getDeliveryBox() {
    return this.elements.deliveryBox();
  }

  getBillingBox() {
    return this.elements.billingBox();
  }
}
