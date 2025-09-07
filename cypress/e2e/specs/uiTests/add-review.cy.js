/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { ProductDetailsPage } from "../../../support/pages/productDetailsPage";

const productsPage = new ProductsPage();
const detailsPage = new ProductDetailsPage();

describe("UI Platform - TC21: Add review on product", () => {
  it("submits a review and sees the success message", () => {
    // Step 1–2: Launch browser + navigate (covered by visit)
    productsPage.visit();

    // Step 3–4: Open Products and check ALL PRODUCTS page
    productsPage.getTitle().should("be.visible");

    // Step 5: Click on 'View Product' (first product)
    productsPage.openFirstProduct();

    // Step 6–8: Write review (name, email, review) and submit
    detailsPage.writeReviewWithFaker();

    // Step 9: Verify success message
    detailsPage.getReviewSuccessMessage().should("be.visible");
  });
});
