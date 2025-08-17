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

  // Teste agrupado com todos os itens de uma vez
  it("should display all expected navbar items", () => {
    home.visit();

    menuItems.forEach((item) => {
      home.getNavMenuItem(item).should("exist");
    });
  });

  // Testes separados, um it() para cada item
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
