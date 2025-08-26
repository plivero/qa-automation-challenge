// cypress/support/pages/cartPage.js
// @ts-check
/// <reference types="cypress" />

export class CartPage {
  visit() {
    cy.visit("/view_cart");
  }

  // getter: visible rows in cart table
  getVisibleRows() {
    return cy.get(".cart_info tbody tr:visible");
  }

  // action: remove first item
  removeFirstItem() {
    cy.get('.cart_quantity_delete, a[title="Delete"]')
      .first()
      .click({ force: true });
  }

  // getter: first item quantity cell
  getFirstItemQuantityCell() {
    return cy.get(".cart_info tbody tr").first().find(".cart_quantity");
  }

  // action: proceed to checkout
  proceedToCheckout() {
    cy.contains(/Proceed To Checkout/i).click({ force: true });
  }

  // optional helper getters if you want to assert in spec
  getHeader() {
    return cy.contains(/shopping cart/i);
  }
}
