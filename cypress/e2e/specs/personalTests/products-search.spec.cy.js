import { ProductsPage } from "../../pages/productsPage";

const products = new ProductsPage();

describe("Products - Product search", () => {
  beforeEach(() => {
    products.visit(); // open Products page directly
    products.assertLoaded(); // ensure it loaded
  });

  it("should find products when searching for 'dress'", () => {
    products.search("dress");
    products.assertSearchResults();
  });
  it("should find products when searching for 'tops'", () => {
    products.search("tops");
    products.assertSearchResults();
  });
  it("should find products when searching for 'saree'", () => {
    products.search("saree");
    products.assertSearchResults();
  });

  it("should find products when searching for 'jeans'", () => {
    products.search("jeans");
    products.assertSearchResults();
  });

  it("should find products when searching for 't-shirt'", () => {
    products.search("t-shirt");
    products.assertSearchResults();
  });

  it.only("should show zero results when searching for a non-existing product", () => {
    products.search("xxxxx"); // term that does not exist
    products.assertNoSearchResults(); // robust validation (not relying on message)
  });
});
