// cypress/support/pages/cartPage.js
// @ts-check
/// <reference types="cypress" />

export class CartPage {
  visit() {
    cy.visit("/view_cart");
  }

  // Getter: visible rows in cart table
  getVisibleRows() {
    return cy.get(".cart_info tbody tr:visible");
  }

  // Getter: all rows (not filtered by :visible)
  getRows() {
    return cy.get("#cart_info_table tbody tr");
  }

  // Getter: one row by index (0-based)
  getRow(index) {
    return this.getRows().eq(index);
  }

  // Action: remove first item
  removeFirstItem() {
    cy.get('.cart_quantity_delete, a[title="Delete"]')
      .first()
      .click({ force: true });
  }

  // Getter: first item quantity cell
  getFirstItemQuantityCell() {
    return cy.get(".cart_info tbody tr").first().find(".cart_quantity");
  }

  // Action: proceed to checkout
  proceedToCheckout() {
    cy.contains(/Proceed To Checkout/i).click({ force: true });
  }

  // Click "Register / Login" inside the checkout modal
  clickRegisterFromCheckoutModal() {
    cy.get(".modal-content", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get('a[href="/login"]').click({ force: true });
      });
  }

  // Helper getters if you want to assert in spec
  getHeader() {
    return cy.contains(/shopping cart/i);
  }
  // Click "Register / Login" in the modal and go to /login
  clickRegisterLoginOnModal() {
    cy.contains("Register / Login").click();
    cy.visit("/login");
  }
}
