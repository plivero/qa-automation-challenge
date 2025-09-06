// cypress/support/pages/checkoutPage.js
// @ts-check
/// <reference types="cypress" />

export class CheckoutPage {
  elements = {
    checkoutContainer: () =>
      cy.contains(/address details|review your order|checkout/i),
    addressDetailsHeader: () => cy.contains(/Address Details/i),
    reviewYourOrderHeader: () => cy.contains(/Review Your Order/i),
    orderCommentTextarea: () => cy.get('textarea[name="message"]'),
    placeOrderBtn: () => cy.contains(/place order/i),
    orderSuccessMessage: () =>
      cy.contains(
        /your order has been placed successfully|order placed|congratulations/i
      ),
    downloadInvoiceBtn: () => cy.contains(/Download Invoice/i),
  };

  getCheckoutContainer() {
    return this.elements.checkoutContainer();
  }

  getAddressDetailsHeader() {
    return this.elements.addressDetailsHeader();
  }

  getReviewYourOrderHeader() {
    return this.elements.reviewYourOrderHeader();
  }

  addOrderComment(text) {
    this.elements.orderCommentTextarea().clear().type(text);
  }

  clickPlaceOrder() {
    this.elements.placeOrderBtn().click({ force: true });
  }

  getOrderSuccessMessage() {
    return this.elements.orderSuccessMessage();
  }

  clickDownloadInvoice() {
    this.elements.downloadInvoiceBtn().should("be.visible").click();
  }
}
