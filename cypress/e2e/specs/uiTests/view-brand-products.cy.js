/// <reference types="cypress" />

import { ProductsPage } from "../../../support/pages/productsPage";
import { BrandsSidebar } from "../../../support/pages/brandsPage";

const productsPage = new ProductsPage();
const brandsPage = new BrandsSidebar();

describe("UI Platform - TC19: View & Cart Brand Products", () => {
  it("opens two brand pages from the sidebar", () => {
    // Step 1: open All Products
    productsPage.visit();
    productsPage.getTitle().should("be.visible");

    // Step 2: brands sidebar visible
    brandsPage.getSidebar().should("be.visible");

    // Step 3: click first brand
    brandsPage.clickBrandByIndex(0);
    brandsPage.getBrandHeader().should("be.visible");
    brandsPage.getProductsGrid().should("be.visible");

    // Step 4: click second brand
    brandsPage.clickBrandByIndex(1);
    brandsPage.getBrandHeader().should("be.visible");
    brandsPage.getProductsGrid().should("be.visible");
  });
});
