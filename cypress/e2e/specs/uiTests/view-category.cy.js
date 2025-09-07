/// <reference types="cypress" />

import { CategoriesSidebar } from "../../../support/pages/categoriesPage";

const catsPage = new CategoriesSidebar();

describe("UI Platform - TC18: View Category Products", () => {
  it("follows Women → Tops and Men → Tshirts", () => {
    // Step 1: Open home
    cy.visit("/");

    // Step 2–3: Sidebar visible with 'Category'
    catsPage.getSidebar().should("be.visible").and("contain.text", "Category");

    // Step 4–6: Women → Tops
    catsPage.expandWomen();
    catsPage.clickWomenTops();
    catsPage.getWomenTopsHeader().should("be.visible");

    // Step 7–8: Men → Tshirts
    catsPage.expandMen();
    catsPage.clickMenTshirts();
    catsPage.getMenTshirtsHeader().should("be.visible");
  });
});
