// cypress/e2e/specs/products-search.spec.cy.js

import { ProductsPage } from "../../pages/productsPage";

const products = new ProductsPage();

describe("Products - Busca de produtos", () => {
  beforeEach(() => {
    products.visit(); // abre direto a página de Products
    products.assertLoaded(); // garante que carregou
  });

  it("deve encontrar produtos ao buscar por 'dress'", () => {
    products.search("dress");
    products.assertSearchResults();
  });
  it("deve encontrar produtos ao buscar por 'tops'", () => {
    products.search("tops");
    products.assertSearchResults();
  });
  it("deve encontrar produtos ao buscar por 'saree'", () => {
    products.search("saree");
    products.assertSearchResults();
  });

  it("deve encontrar produtos ao buscar por 'jeans'", () => {
    products.search("jeans");
    products.assertSearchResults();
  });

  it("deve encontrar produtos ao buscar por 't-shirt'", () => {
    products.search("t-shirt");
    products.assertSearchResults();
  });

  it.only("deve exibir zero resultados ao buscar produto inexistente", () => {
    products.search("xxxxx"); // termo que não existe
    products.assertNoSearchResults(); // validação robusta (sem depender de mensagem)
  });
});
