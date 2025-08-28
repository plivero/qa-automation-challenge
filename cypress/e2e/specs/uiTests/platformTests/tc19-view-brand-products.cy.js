/// <reference types="cypress" />

import { ProductsPage } from "../../../../support/pages/productsPage";
import { BrandsSidebar } from "../../../../support/pages/brandsPage";

const products = new ProductsPage();
const brands = new BrandsSidebar();

describe("UI Platform - TC19: View & Cart Brand Products", () => {
  it("opens two brand pages from the sidebar", () => {
    // Step 1: open All Products
    products.visit();
    products.getTitle().should("be.visible");

    // Step 2: brands sidebar visible
    brands.getSidebar().should("be.visible");

    // Step 3: click first brand
    brands.clickBrandByIndex(0);
    brands.getBrandHeader().should("be.visible");
    brands.getProductsGrid().should("be.visible");

    // Step 4: click second brand
    brands.clickBrandByIndex(1);
    brands.getBrandHeader().should("be.visible");
    brands.getProductsGrid().should("be.visible");
  });
});
