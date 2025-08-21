import { HomePage } from "../../pages/homePage";
import { ProductsPage } from "../../pages/productsPage";

const home = new HomePage();
const products = new ProductsPage();

describe("Products - Basic list", () => {
  it("opens the Products page and displays the list", () => {
    home.visit("/"); // start from home (stable)
    home.getNavMenuItem("Products").click(); // navigate through navbar
    products.assertLoaded(); // validate heading + grid
  });
});
