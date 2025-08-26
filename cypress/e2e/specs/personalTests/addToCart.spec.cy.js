// cypress/e2e/specs/personalTests/cart-add-product.spec.cy.js
import { ProductsPage } from "../../../support/pages/productsPage";
import { CartPage } from "../../../support/pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Cart - Add product", () => {
  it("adds the first product and validates it in the cart", () => {
    products.visit(); // action
    products.addFirstItemToCart(); // action
    products.getAddedModal().should("be.visible"); // assertion in spec
    products.openCartFromModal(); // action

    cy.url().should("include", "/view_cart"); // assertion in spec
    cy.contains(/shopping cart/i).should("be.visible"); // assertion in spec
    cart.getVisibleRows().its("length").should("be.gte", 1); // assertion in spec
  });
});
