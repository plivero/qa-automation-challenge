import { HomePage } from "../../../support/pages/homePage";

const home = new HomePage();

describe("UI Platform - Navbar sanity check", () => {
  it("should display all navbar links", () => {
    home.visit();
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
      home.getNavMenuItem(item).should("exist");
    });
  });
});
