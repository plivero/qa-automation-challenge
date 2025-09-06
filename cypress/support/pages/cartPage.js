// cypress/support/pages/cartPage.js
// @ts-check
/// <reference types="cypress" />

export class CartPage {
  elements = {
    visibleRows: () => cy.get(".cart_info tbody tr:visible"),
    rows: () => cy.get("#cart_info_table tbody tr"),
    deleteBtns: () => cy.get('.cart_quantity_delete, a[title="Delete"]'),
    firstItemQuantityCell: () =>
      cy.get(".cart_info tbody tr").first().find(".cart_quantity"),
    checkoutBtn: () => cy.contains(/Proceed To Checkout/i),
    checkoutModal: () => cy.get(".modal-content", { timeout: 10000 }),
    registerLoginFromModal: () => cy.get('a[href="/login"]'),
    registerLoginLink: () => cy.contains("Register / Login"),
    header: () => cy.contains(/shopping cart/i),
  };

  visit() {
    cy.visit("/view_cart");
  }

  getVisibleRows() {
    return this.elements.visibleRows();
  }

  getRows() {
    return this.elements.rows();
  }

  getRow(index) {
    return this.elements.rows().eq(index);
  }

  removeFirstItem() {
    this.elements.deleteBtns().first().click({ force: true });
  }

  getFirstItemQuantityCell() {
    return this.elements.firstItemQuantityCell();
  }

  proceedToCheckout() {
    this.elements.checkoutBtn().click({ force: true });
  }

  clickRegisterFromCheckoutModal() {
    this.elements
      .checkoutModal()
      .should("be.visible")
      .within(() => {
        this.elements.registerLoginFromModal().click({ force: true });
      });
  }

  getHeader() {
    return this.elements.header();
  }

  clickRegisterLoginOnModal() {
    this.elements.registerLoginLink().click();
    cy.visit("/login");
  }
}
