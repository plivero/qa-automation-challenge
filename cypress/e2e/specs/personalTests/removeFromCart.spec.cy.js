import { ProductsPage } from "../../pages/productsPage";
import { CartPage } from "../../pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Cart - Remove item", () => {
  it("adds an item and then removes it from the cart", () => {
    // 1) add any item from the products list
    products.visit();
    products.addFirstItemToCart();
    products.openCartFromModal();

    // 2) now in the cart; remove the first item
    cart.assertLoaded();
    cart.assertHasItems(1);
    cart.removeFirstItem();

    // 3) validate that it is empty (or no visible rows)
    cart.assertEmpty();
  });
});
