// cypress/support/pages/productDetailsPage.js
// @ts-check
/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

export class ProductDetailsPage {
  elements = {
    detailsContainer: () => cy.get(".product-information"),
    nameFragment: (fragment) =>
      cy.contains(".product-information", new RegExp(fragment, "i")),
    category: () => cy.contains(".product-information", /category/i),
    price: () => cy.contains(".product-information", /Rs\.\s*\d/),
    availability: () => cy.contains(".product-information", /availability/i),
    condition: () => cy.contains(".product-information", /condition/i),
    brand: () => cy.contains(".product-information", /brand/i),

    quantityInput: () => cy.get("#quantity"),
    addToCartBtn: () => cy.contains("Add to cart"),
    addedModal: () => cy.contains("Added!"),
    viewCartBtn: () => cy.contains("View Cart"),

    reviewTitle: () => cy.contains(/Write Your Review/i),
    reviewNameInput: () => cy.get("#name"),
    reviewEmailInput: () => cy.get("#email"),
    reviewTextInput: () => cy.get("#review"),
    reviewSubmitBtn: () => cy.get("#button-review"),
    reviewSuccess: () => cy.contains(/Thank you for your review/i),
  };

  getDetailsContainer() {
    return this.elements.detailsContainer();
  }

  getNameFragment(nameFragment) {
    return this.elements.nameFragment(nameFragment);
  }

  getCategory() {
    return this.elements.category();
  }

  getPrice() {
    return this.elements.price();
  }

  getAvailability() {
    return this.elements.availability();
  }

  getCondition() {
    return this.elements.condition();
  }

  getBrand() {
    return this.elements.brand();
  }

  setQuantity(qty) {
    this.elements.quantityInput().clear().type(String(qty));
  }

  addToCartFromDetails() {
    this.elements.addToCartBtn().click({ force: true });
  }

  getAddedModal() {
    return this.elements.addedModal();
  }

  openCartFromModal() {
    this.elements.viewCartBtn().click();
  }

  writeReviewWithDefaults() {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const text = faker.commerce.productDescription();

    this.elements.reviewTitle().should("be.visible");
    this.elements.reviewNameInput().clear().type(name);
    this.elements.reviewEmailInput().clear().type(email);
    this.elements.reviewTextInput().clear().type(text);
    this.elements.reviewSubmitBtn().click({ force: true });
  }

  getReviewSuccessMessage() {
    return this.elements.reviewSuccess();
  }
}
