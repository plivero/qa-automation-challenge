/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { ProductDetailsPage } from "../../../support/pages/productDetailsPage";

const products = new ProductsPage();
const details = new ProductDetailsPage();

describe("UI Platform - TC21: Add review on product", () => {
  it("submits a review and sees the success message", () => {
    // Step 1–2: Launch browser + navigate (covered by visit)
    products.visit();

    // Step 3–4: Open Products and check ALL PRODUCTS page
    products.getTitle().should("be.visible");

    // Step 5: Click on 'View Product' (first product)
    products.openFirstProduct();

    // Step 6–8: Write review (name, email, review) and submit
    details.writeReviewWithDefaults();

    // Step 9: Verify success message
    details.getReviewSuccessMessage().should("be.visible");
  });
});
