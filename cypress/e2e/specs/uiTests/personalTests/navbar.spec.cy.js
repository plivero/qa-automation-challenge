import { HomePage } from "../../../../support/pages/homePage";

const home = new HomePage();

describe("Navbar Links (infantil)", () => {
  it("should show Home link", () => {
    home.visit();
    home.getNavMenuItem("Home").should("exist");
  });

  it("should show Products link", () => {
    home.visit();
    home.getNavMenuItem("Products").should("exist");
  });

  it("should show Cart link", () => {
    home.visit();
    home.getNavMenuItem("Cart").should("exist");
  });

  it("should show Signup / Login link", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").should("exist");
  });

  it("should show Test Cases link", () => {
    home.visit();
    home.getNavMenuItem("Test Cases").should("exist");
  });

  it("should show API Testing link", () => {
    home.visit();
    home.getNavMenuItem("API Testing").should("exist");
  });

  it("should show Video Tutorials link", () => {
    home.visit();
    home.getNavMenuItem("Video Tutorials").should("exist");
  });

  it("should show Contact us link", () => {
    home.visit();
    home.getNavMenuItem("Contact us").should("exist");
  });
});
