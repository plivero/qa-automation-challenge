import { ProductsPage } from "../pages/productsPage";
import { CartPage } from "../pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Cart - Adicionar produto", () => {
  it("adiciona o primeiro produto e valida no carrinho", () => {
    products.visit(); // abre /products
    products.addFirstItemToCart(); // clica no Add to cart do 1º card
    products.openCartFromModal(); // clica em "View Cart" no modal

    cart.assertLoaded(); // confirma que está em /view_cart
    cart.assertHasItems(1); // garante que há pelo menos 1 item listado
  });
});
