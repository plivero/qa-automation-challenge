import { HomePage } from "../../pages/homePage";
import { ProductsPage } from "../../pages/productsPage";

const home = new HomePage();
const products = new ProductsPage();

describe("Products - Lista básica", () => {
  it("abre a página de Products e exibe a lista", () => {
    home.visit("/"); // começa da home (estável)
    home.getNavMenuItem("Products").click(); // navega pela navbar
    products.assertLoaded(); // valida heading + grid
  });
});
