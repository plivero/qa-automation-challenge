import { ProductsPage } from "../../pages/productsPage";
import { ProductDetailsPage } from "../../pages/productDetailsPage";
import { CartPage } from "../../pages/cartPage";

const products = new ProductsPage();
const details = new ProductDetailsPage();
const cart = new CartPage();

describe("Cart - Alterar quantidade (via detalhes)", () => {
  it("define quantidade=3 nos detalhes, adiciona ao carrinho e valida no carrinho", () => {
    // 1) vai para a lista de produtos
    products.visit();
    products.assertLoaded();

    // 2) abre a página de detalhes de um produto (o primeiro da lista, simples)
    cy.get(".product-image-wrapper").first().contains("View Product").click();

    // 3) define a quantidade no detalhe e adiciona ao carrinho
    details.setQuantity(3);
    details.addToCartFromDetails();
    details.openCartFromModal();

    // 4) valida no carrinho que a quantidade do primeiro item é 3
    cart.assertLoaded();
    cart.assertFirstItemQuantity(3);
  });
});
