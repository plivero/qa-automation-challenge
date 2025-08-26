// cypress/e2e/specs/personalTests/products-list.spec.cy.js
// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { ProductsPage } from "../../../support/pages/productsPage";

const home = new HomePage();
const products = new ProductsPage();

describe("Products - Basic list", () => {
  it("opens the Products page and displays the list", () => {
    // start from home and navigate via navbar
    home.visit();
    home.getNavMenuItem("Products").click();

    // assert: heading and grid visible
    products.getTitle().should("be.visible");
    products.getGrid().should("exist");
  });
});
