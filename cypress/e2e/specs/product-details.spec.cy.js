import { ProductsPage } from "../pages/productsPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";

const products = new ProductsPage();
const productDetails = new ProductDetailsPage();

describe("Products - Detalhes do Produto", () => {
  it("abre detalhes de um produto e valida as informações", () => {
    // Visita a página de produtos
    products.visit();
    products.assertLoaded();

    // Abre o primeiro produto da lista
    cy.get(".product-image-wrapper").first().contains("View Product").click();

    // Valida os detalhes do produto
    productDetails.assertDetails();
    // Se quiser validar um nome específico:
    // productDetails.assertDetails('Sleeveless Dress');
  });
});
