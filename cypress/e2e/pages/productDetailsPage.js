// @ts-check
/// <reference types="cypress" />

export class ProductDetailsPage {
  /**
   * Valida a página de detalhes do produto.
   * Se "nameFragment" for passado, checa que o nome aparece no bloco.
   */
  assertDetails(nameFragment) {
    cy.get(".product-information").should("be.visible");

    if (nameFragment) {
      cy.contains(".product-information", new RegExp(nameFragment, "i")).should(
        "be.visible"
      );
    }

    cy.get(".product-information").within(() => {
      cy.contains(/category/i).should("be.visible");
      cy.contains(/Rs\.\s*\d/).should("be.visible"); // preço no formato "Rs. 1000"
      cy.contains(/availability/i).should("be.visible");
      cy.contains(/condition/i).should("be.visible");
      cy.contains(/brand/i).should("be.visible");
    });
  }

  setQuantity(qty) {
    // campo de quantidade nos detalhes do produto
    cy.get("#quantity").clear().type(String(qty));
  }

  addToCartFromDetails() {
    cy.contains("Add to cart").click({ force: true });
    cy.contains("Added!").should("be.visible");
  }

  openCartFromModal() {
    cy.contains("View Cart").click();
  }
}
