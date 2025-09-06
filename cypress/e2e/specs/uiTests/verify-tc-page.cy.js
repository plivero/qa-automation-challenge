/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";
import { TestCasesPage } from "../../../support/pages/testCasesPage";

const homePage = new HomePage();
const testCasesPage = new TestCasesPage();

describe("UI Platform - TC7: Verify Test Cases page", () => {
  it("navigates to the Test Cases page successfully", () => {
    // Step 1–2: Launch & navigate
    homePage.visit();

    // Step 3: Home visible
    cy.location("pathname").should("eq", "/");
    homePage.getLogo().should("be.visible");
    homePage.getHeroText().should("be.visible");

    // Step 4: Click on 'Test Cases' button
    homePage.getNavTestCases().click();

    // Step 5: Verify user is on Test Cases page
    cy.location("pathname").should("eq", "/test_cases");
    testCasesPage.getTitle().should("be.visible");
    testCasesPage.getFirstCaseItem().should("be.visible");
  });
});
