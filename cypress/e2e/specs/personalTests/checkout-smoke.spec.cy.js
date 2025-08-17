// @ts-check
/// <reference types="cypress" />

import { ProductsPage } from "../../pages/productsPage";
import { CartPage } from "../../pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Checkout - Smoke", () => {
  it("adiciona item e avança para o checkout", () => {
    products.visit();
    products.addFirstItemToCart();
    products.openCartFromModal();

    cart.assertLoaded();
    cart.assertHasItems(1);
    cart.proceedToCheckout();

    cy.get("body").then(($b) => {
      const txt = $b.text();
      expect(/Address Details|Checkout|Register \/ Login/i.test(txt)).to.be
        .true;
    });
  });
});
