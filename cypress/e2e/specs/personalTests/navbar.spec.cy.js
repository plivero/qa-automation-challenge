import { HomePage } from "../../pages/homePage";

const home = new HomePage();

describe("Navbar Links", () => {
  const menuItems = [
    "Home",
    "Products",
    "Cart",
    "Signup / Login",
    "Test Cases",
    "API Testing",
    "Video Tutorials",
    "Contact us",
  ];

  // Grouped test with all items at once
  it("should display all expected navbar items", () => {
    home.visit();

    menuItems.forEach((item) => {
      home.getNavMenuItem(item).should("exist");
    });
  });

  // Separate tests, one it() for each item
  describe("Each Navbar Link individually", () => {
    beforeEach(() => {
      home.visit();
    });

    menuItems.forEach((item) => {
      it(`should display the navbar item: "${item}"`, () => {
        home.getNavMenuItem(item).should("exist");
      });
    });
  });
});
