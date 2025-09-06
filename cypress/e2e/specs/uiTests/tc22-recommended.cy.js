/// <reference types="cypress" />

import { RecommendedPage } from "../../../support/pages/recommendedPage";
import { CartPage } from "../../../support/pages/cartPage";

const recommendedPage = new RecommendedPage();
const cartPage = new CartPage();

describe("UI Platform - TC22: Add to cart from Recommended items", () => {
  it("adds a recommended product and verifies it in the cart", () => {
    // Step 1–2: Launch browser + navigate
    recommendedPage.visitAndScrollToSection();

    // Step 3–4: Scroll to bottom + check 'RECOMMENDED ITEMS'
    recommendedPage.getSectionTitle().should("be.visible");
    recommendedPage.getSection().should("be.visible");

    // Step 5: Add to cart from recommended product
    recommendedPage.addFirstRecommendedToCart();

    // Step 6: Click on 'View Cart' button
    recommendedPage.openCartFromModal();
    cartPage.visit();

    // Step 7: Verify product is displayed in cart page
    cartPage.getVisibleRows().should("have.length.greaterThan", 0);
    cartPage.getRows().first().find(".cart_description").should("be.visible");
  });
});
