/// <reference types="cypress" />

import { HomePage } from "../../../support/pages/homePage";

const homePage = new HomePage();

describe("UI Platform - Navbar sanity check", () => {
  it("should display all navbar links", () => {
    homePage.visit();
    homePage.getNavHome().should("exist");
    homePage.getNavProducts().should("exist");
    homePage.getNavCart().should("exist");
    homePage.getNavSignupLogin().should("exist");
    homePage.getNavTestCases().should("exist");
    homePage.getNavApiTesting().should("exist");
    homePage.getNavVideoTutorials().should("exist");
    homePage.getNavContactUs().should("exist");
  });
});
