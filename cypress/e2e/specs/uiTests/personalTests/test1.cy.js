import { HomePage } from "../../../support/pages/homePage";

const home = new HomePage();

describe("Home Page", () => {
  it("should load the homepage and display the logo", () => {
    home.visit();
    home.getLogo().should("be.visible");
  });
});
