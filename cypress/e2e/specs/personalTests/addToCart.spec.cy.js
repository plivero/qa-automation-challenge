import { ProductsPage } from "../../pages/productsPage";
import { CartPage } from "../../pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Cart - Add product", () => {
  it("adds the first product and validates it in the cart", () => {
    products.visit(); // open /products
    products.addFirstItemToCart(); // click Add to cart on the 1st card
    products.openCartFromModal(); // click "View Cart" in the modal

    cart.assertLoaded(); // confirm that it is on /view_cart
    cart.assertHasItems(1); // ensure there is at least 1 item listed
  });
});
