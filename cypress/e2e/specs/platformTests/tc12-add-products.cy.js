// cypress/e2e/specs/personalTests/tc12-add-products-cart.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("UI Platform - TC12: Add Products in Cart", () => {
  it("adds two products and verifies prices, quantity and totals", () => {
    // Step 1–2: open site and go to All Products
    products.visit();

    // Step 3–5: page loaded (heading + grid)
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");

    // Step 6: add first product, continue shopping
    products.addItemByIndex(0);
    products.clickContinueShoppingInModal();

    // Step 7–8: add second product and open cart
    products.addItemByIndex(1);
    products.openCartFromModal();

    // Step 9: verify at least 2 rows in cart
    cy.url().should("include", "/view_cart");
    cart.getRows().should("have.length.greaterThan", 1);

    // Step 10: verify price, qty and total for first 2 rows
    const toNumber = (s) => Number(String(s).replace(/\D/g, "")); // digits only

    [0, 1].forEach((i) => {
      cart.getRow(i).then(($tr) => {
        const price = toNumber($tr.find("td.cart_price p").text());
        const qty = toNumber($tr.find("td.cart_quantity").text());
        const total = toNumber($tr.find("td.cart_total p").text());

        expect(price, "price > 0").to.be.gt(0);
        expect(qty, "qty > 0").to.be.gt(0);
        expect(total, "total = price * qty").to.eq(price * qty);
      });
    });
  });
});
