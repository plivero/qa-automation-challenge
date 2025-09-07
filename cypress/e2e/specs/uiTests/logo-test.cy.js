import { HomePage } from "../../../support/pages/homePage";

const homePage = new HomePage();

describe("Home Page", () => {
  it("should load the homepage and display the logo", () => {
    homePage.visit();
    homePage.getLogo().should("be.visible");
  });
});
