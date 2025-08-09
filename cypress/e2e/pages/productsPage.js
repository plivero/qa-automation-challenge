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
}
