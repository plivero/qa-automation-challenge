/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { ProductDetailsPage } from "../../../support/pages/productDetailsPage";

const productsPage = new ProductsPage();
const productDetailsPage = new ProductDetailsPage();

describe("Products - Product Details", () => {
  it("opens product details and validates the information", () => {
    // visit products
    productsPage.visit();
    productsPage.getTitle().should("be.visible");
    productsPage.getGrid().should("exist");

    // open first product
    productsPage.openFirstProduct();

    // asserts on details
    productDetailsPage.getDetailsContainer().should("be.visible");
    productDetailsPage.getCategory().should("be.visible");
    productDetailsPage.getPrice().should("be.visible");
    productDetailsPage.getAvailability().should("be.visible");
    productDetailsPage.getCondition().should("be.visible");
    productDetailsPage.getBrand().should("be.visible");
  });
});
