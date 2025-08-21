// @ts-check
/// <reference types="cypress" />

export class CartPage {
  visit() {
    cy.visit("/view_cart");
  }

  assertLoaded() {
    cy.url().should("include", "/view_cart");
    cy.contains(/shopping cart/i).should("be.visible");
  }

  assertHasItems(min = 1) {
    cy.get(".cart_description, .cart_info tbody tr")
      .filter(":visible")
      .its("length")
      .should("be.gte", min);
  }

  removeFirstItem() {
    cy.get('.cart_quantity_delete, a[title="Delete"]')
      .first()
      .click({ force: true });
  }

  // stable version and without "possibly undefined" warning
  assertEmpty() {
    // 1) first ensure there are no visible rows
    cy.get(".cart_info tbody tr:visible").should("have.length", 0);

    // 2) optional: if the page shows an empty message, validate it
    cy.get("body").then(($body) => {
      const bodyText = $body.text();
      const hasEmptyMsg = /cart is empty|no products/i.test(bodyText);
      if (hasEmptyMsg) {
        cy.contains(/cart is empty|no products/i).should("be.visible");
      }
    });
  }

  assertFirstItemQuantity(qty) {
    cy.get(".cart_info tbody tr")
      .first()
      .find(".cart_quantity")
      .should("contain.text", String(qty));
  }

  proceedToCheckout() {
    cy.contains(/Proceed To Checkout/i).click({ force: true });
  }
}
