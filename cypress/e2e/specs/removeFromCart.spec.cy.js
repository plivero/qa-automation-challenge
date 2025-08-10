import { ProductsPage } from "../pages/productsPage";
import { CartPage } from "../pages/cartPage";

const products = new ProductsPage();
const cart = new CartPage();

describe("Cart - Remover item", () => {
  it("adiciona um item e depois remove do carrinho", () => {
    // 1) adiciona qualquer item a partir da lista de produtos
    products.visit();
    products.addFirstItemToCart();
    products.openCartFromModal();

    // 2) estamos no carrinho; remove o primeiro
    cart.assertLoaded();
    cart.assertHasItems(1);
    cart.removeFirstItem();

    // 3) valida que ficou vazio (ou sem linhas visíveis)
    cart.assertEmpty();
  });
});
