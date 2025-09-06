/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";

const productsPage = new ProductsPage();
const cartPage = new CartPage();

describe("UI Platform - TC12: Add Products in Cart", () => {
  it("adds two products and verifies prices, quantity and totals", () => {
    const toNumber = (s) => Number(String(s).replace(/\D/g, "")); // digits only

    // Step 1: Launch browser
    // (handled by Cypress runner)

    // Step 2: Navigate to url 'http://automationexercise.com'
    productsPage.visit();

    // Step 3: Verify that home page is visible successfully
    productsPage.getTitle().should("be.visible");
    productsPage.getGrid().should("exist");

    // Step 4: Click 'Products' button
    // (already on /products via visit; page elements are visible)

    // Step 5: Hover over first product and click 'Add to cart'
    productsPage.addItemByIndex(0);

    // Step 6: Click 'Continue Shopping' button
    productsPage.clickContinueShoppingInModal();

    // Step 7: Hover over second product and click 'Add to cart'
    productsPage.addItemByIndex(1);

    // Step 8: Click 'View Cart' button
    productsPage.openCartFromModal();

    // Step 9: Verify both products are added to Cart
    cy.url().should("include", "/view_cart");
    cartPage.getRows().should("have.length.greaterThan", 1);

    // Step 10: Verify their prices, quantity and total price (row 1)
    cartPage.getRow(0).then(($tr) => {
      const price = toNumber($tr.find("td.cart_price p").text());
      const qty = toNumber($tr.find("td.cart_quantity").text());
      const total = toNumber($tr.find("td.cart_total p").text());

      expect(price, "price > 0").to.be.gt(0);
      expect(qty, "qty > 0").to.be.gt(0);
      expect(total, "total = price * qty").to.eq(price * qty);
    });

    // Step 10: Verify their prices, quantity and total price (row 2)
    cartPage.getRow(1).then(($tr) => {
      const price = toNumber($tr.find("td.cart_price p").text());
      const qty = toNumber($tr.find("td.cart_quantity").text());
      const total = toNumber($tr.find("td.cart_total p").text());

      expect(price, "price > 0").to.be.gt(0);
      expect(qty, "qty > 0").to.be.gt(0);
      expect(total, "total = price * qty").to.eq(price * qty);
    });
  });
});
