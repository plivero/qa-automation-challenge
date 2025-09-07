import { HomePage } from "../../../support/pages/homePage";
import { ProductsPage } from "../../../support/pages/productsPage";

const homePage = new HomePage();
const productsPage = new ProductsPage();

describe("UI Platform - TC9: Search Product", () => {
  it("searches by keyword and shows related products", () => {
    // Step 1–2: Launch browser + navigate
    homePage.visit();

    // Step 3: Verify that home page is visible successfully
    homePage.getLogo().should("be.visible");

    // Step 4: Click on 'Products' button
    homePage.getNavProducts().click();

    // Step 5: Verify user is navigated to ALL PRODUCTS page
    cy.location("pathname").should("eq", "/products");
    productsPage.getTitle().should("be.visible");

    // Step 6: Enter product name and click search
    productsPage.search("dress");

    // Step 7: Verify 'SEARCHED PRODUCTS' is visible
    cy.contains(/Searched Products/i).should("be.visible");

    // Step 8: Verify all related products are visible
    productsPage.getProductCards().should("have.length.greaterThan", 0);
  });
});
