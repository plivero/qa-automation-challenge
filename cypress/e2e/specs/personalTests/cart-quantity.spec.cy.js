import { ProductsPage } from "../../pages/productsPage";
import { ProductDetailsPage } from "../../pages/productDetailsPage";
import { CartPage } from "../../pages/cartPage";

const products = new ProductsPage();
const details = new ProductDetailsPage();
const cart = new CartPage();

describe("Cart - Change quantity (via details)", () => {
  it("sets quantity=3 in details, adds to cart and validates in cart", () => {
    // 1) go to the products list
    products.visit();
    products.assertLoaded();

    // 2) open the product details page (the first item in the list, simple)
    cy.get(".product-image-wrapper").first().contains("View Product").click();

    // 3) set the quantity in details and add to cart
    details.setQuantity(3);
    details.addToCartFromDetails();
    details.openCartFromModal();

    // 4) validate in the cart that the first item has quantity = 3
    cart.assertLoaded();
    cart.assertFirstItemQuantity(3);
  });
});
