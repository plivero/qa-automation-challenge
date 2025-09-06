import { HomePage } from "../../../support/pages/homePage";

const homePage = new HomePage();

describe("UI Platform - Navbar sanity check", () => {
  it("should display all navbar links", () => {
    homePage.visit();
    [
      "Home",
      "Products",
      "Cart",
      "Signup / Login",
      "Test Cases",
      "API Testing",
      "Video Tutorials",
      "Contact us",
    ].forEach((item) => {
      homePage.getNavMenuItem(item).should("exist");
    });
  });
});
