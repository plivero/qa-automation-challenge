// cypress/e2e/specs/personalTests/tc22-recommended.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { RecommendedPage } from "../../../support/pages/recommendedPage";
import { CartPage } from "../../../support/pages/cartPage";

const recommended = new RecommendedPage();
const cart = new CartPage();

describe("UI Platform - TC22: Add to cart from Recommended items", () => {
  it("adds a recommended product and verifies it in the cart", () => {
    // Step 1–2: Launch browser + navigate
    recommended.visitAndScrollToSection();

    // Step 3–4: Scroll to bottom + check 'RECOMMENDED ITEMS'
    recommended.getSectionTitle().should("be.visible");
    recommended.getSection().should("be.visible");

    // Step 5: Add to cart from recommended product
    recommended.addFirstRecommendedToCart();

    // Step 6: Click on 'View Cart' button
    recommended.openCartFromModal();
    cart.visit();

    // Step 7: Verify product is displayed in cart page
    cart.getVisibleRows().should("have.length.greaterThan", 0);
    recommended.assertFirstRecommendedInCart();
  });
});
