// cypress/support/pages/productDetailsPage.js
/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

export class ProductDetailsPage {
  elements = {
    detailsContainer: () => cy.get(".product-information"),
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

  writeReview(name, email, text) {
    this.elements.reviewNameInput().clear().type(name);
    this.elements.reviewEmailInput().clear().type(email);
    this.elements.reviewTextInput().clear().type(text);
    this.elements.reviewSubmitBtn().click({ force: true });
  }

  writeReviewWithFaker() {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const text = faker.commerce.productDescription();
    this.writeReview(name, email, text);
  }

  getReviewSuccessMessage() {
    return this.elements.reviewSuccess();
  }
}
