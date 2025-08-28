// cypress/e2e/specs/personalTests/tc18-view-category-products.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { CategoriesSidebar } from "../../../support/pages/categoriesPage";

const cats = new CategoriesSidebar();

describe("UI Platform - TC18: View Category Products", () => {
  it("follows Women → Tops and Men → Tshirts", () => {
    // Step 1: open home
    cy.visit("/");

    // Step 2–3: sidebar visible
    cats.getSidebar().should("be.visible").and("contain.text", "Category");

    // Step 4–6: Women → Tops
    cats.expandWomen();
    cats.clickWomenTops();
    cats.getCategoryHeader(/WOMEN\s*-\s*TOPS\s*PRODUCTS/i).should("be.visible");

    // Step 7–8: Men → Tshirts
    cats.expandMen();
    cats.clickMenTshirts();
    cats
      .getCategoryHeader(/MEN\s*-\s*TSHIRTS\s*PRODUCTS/i)
      .should("be.visible");
  });
});
