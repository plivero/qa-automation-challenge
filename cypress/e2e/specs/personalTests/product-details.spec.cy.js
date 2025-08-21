import { ProductsPage } from "../../pages/productsPage";
import { ProductDetailsPage } from "../../pages/productDetailsPage";

const products = new ProductsPage();
const productDetails = new ProductDetailsPage();

describe("Products - Product Details", () => {
  it("opens product details and validates the information", () => {
    // Visit the products page
    products.visit();
    products.assertLoaded();

    // Open the first product in the list
    cy.get(".product-image-wrapper").first().contains("View Product").click();

    // Validate product details
    productDetails.assertDetails();
    // If you want to validate a specific name:
    // productDetails.assertDetails('Sleeveless Dress');
  });
});
