/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { ProductsPage } from "../../../support/pages/productsPage";
import { ProductDetailsPage } from "../../../support/pages/productDetailsPage";

const homePage = new HomePage();
const productsPage = new ProductsPage();
const detailsPage = new ProductDetailsPage();

describe("UI Platform - TC8: Verify All Products & product detail", () => {
  it("opens All Products and validates first product detail", () => {
    // Step 1: Launch browser
    // Step 2: Navigate to url
    homePage.visit();

    // Step 3: Verify that home page is visible successfully
    homePage.getLogo().should("be.visible");

    // Step 4: Click on 'Products' button
    homePage.clickNavProducts();

    // Step 5: Verify user is navigated to ALL PRODUCTS page
    cy.location("pathname").should("eq", "/products");
    productsPage.getTitle().should("be.visible");

    // Step 6: Verify the products list is visible
    productsPage.getProductCards().its("length").should("be.gt", 0);

    // Step 7: Click on 'View Product' of first product
    productsPage.openFirstProduct();

    // Step 8: Verify landed to product detail page
    cy.url().should("include", "/product_details/");

    // Step 9: Verify detail info: name, category, price, availability, condition, brand
    detailsPage.getDetailsContainer().should("be.visible");
    detailsPage.getCategory().should("be.visible");
    detailsPage.getPrice().should("be.visible");
    detailsPage.getAvailability().should("be.visible");
    detailsPage.getCondition().should("be.visible");
    detailsPage.getBrand().should("be.visible");
  });
});
