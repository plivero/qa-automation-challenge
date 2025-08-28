import { ProductsPage } from "../../../../support/pages/productsPage";
import { CartPage } from "../../../../support/pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Cart - Add product", () => {
  it("adds the first product and validates it in the cart", () => {
    products.visit();
    products.addFirstItemToCart();
    products.getAddedModal().should("be.visible");
    products.openCartFromModal();

    cy.url().should("include", "/view_cart");
    cy.contains(/shopping cart/i).should("be.visible");
    cart.getVisibleRows().its("length").should("be.gte", 1);
  });
});
