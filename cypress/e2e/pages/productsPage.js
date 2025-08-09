// @ts-check
/// <reference types="cypress" />

export class ProductsPage {
  visit() {
    cy.visit("/products"); // usa baseUrl
  }

  assertLoaded() {
    // título/heading da página de produtos
    cy.contains(/All Products|Products/i).should("be.visible");
    // grade/lista de produtos visível
    cy.get(".features_items, .product-image-wrapper, .single-products").should(
      "exist"
    );
  }

  search(term) {
    cy.get("#search_product").clear().type(term); // digita no campo de busca
    cy.get("#submit_search").click(); // clica no botão Search
  }

  assertSearchResults() {
    cy.contains("Searched Products").should("be.visible"); // título da seção de resultados
    // garante que retornou pelo menos 1 card visível
    cy.get(".features_items .col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  }

  assertNoSearchResults() {
    cy.contains("Searched Products").should("be.visible"); // seção apareceu
    cy.get(".features_items .col-sm-4:visible") // cards da busca
      .should("have.length", 0); // zero resultados
  }
  openDetailsByName(name) {
    // encontra o card pelo nome e clica em "View Product"
    cy.contains(".productinfo", new RegExp(name, "i"))
      .parents(".product-image-wrapper")
      .contains("View Product")
      .click();
  }
  // Adiciona o PRIMEIRO item visível da lista ao carrinho
  addFirstItemToCart() {
    cy.get(".product-image-wrapper") // pega os cards
      .first() // primeiro card
      .within(() => {
        cy.contains("Add to cart").click({ force: true });
      });

    // confirma o modal de “Added!”
    cy.contains("Added!").should("be.visible");
  }

  // No modal que aparece depois do Add to cart, abre o carrinho
  openCartFromModal() {
    cy.contains("View Cart").click();
  }
}
