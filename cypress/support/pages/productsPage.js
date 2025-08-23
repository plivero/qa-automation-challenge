// @ts-check
/// <reference types="cypress" />

export class ProductsPage {
  visit() {
    cy.visit("/products"); // uses baseUrl
  }

  assertLoaded() {
    // page title/heading for products
    cy.contains(/All Products|Products/i).should("be.visible");
    // product grid/list visible
    cy.get(".features_items, .product-image-wrapper, .single-products").should(
      "exist"
    );
  }

  search(term) {
    cy.get("#search_product").clear().type(term); // type in the search field
    cy.get("#submit_search").click(); // click the Search button
  }

  assertSearchResults() {
    cy.contains("Searched Products").should("be.visible"); // results section title
    // ensure at least 1 visible card is returned
    cy.get(".features_items .col-sm-4:visible")
      .its("length")
      .should("be.gt", 0);
  }

  assertNoSearchResults() {
    cy.contains("Searched Products").should("be.visible"); // section is displayed
    cy.get(".features_items .col-sm-4:visible") // search result cards
      .should("have.length", 0); // zero results
  }

  openDetailsByName(name) {
    // find the card by name and click "View Product"
    cy.contains(".productinfo", new RegExp(name, "i"))
      .parents(".product-image-wrapper")
      .contains("View Product")
      .click();
  }

  // Adds the FIRST visible item from the list to the cart
  addFirstItemToCart() {
    cy.get(".product-image-wrapper") // get product cards
      .first() // first card
      .within(() => {
        cy.contains("Add to cart").click({ force: true });
      });

    // confirm the “Added!” modal
    cy.contains("Added!").should("be.visible");
  }

  // From the modal that appears after Add to cart, open the cart
  openCartFromModal() {
    cy.contains("View Cart").click();
  }
}
