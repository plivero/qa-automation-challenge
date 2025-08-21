import { HomePage } from "../../pages/homePage";
import { LoginPage } from "../../pages/loginPage";

const home = new HomePage();
const login = new LoginPage();

describe("Signup / Login flow (POM)", () => {
  afterEach(() => {
    // Only try to log out if the link exists on the page
    cy.get("body").then(($body) => {
      const hasLogout = $body.find('a[href="/logout"]').length > 0;
      if (hasLogout) {
        cy.get('a[href="/logout"]').click({ force: true });
      }
    });
  });

  it("navigates to the login page via navbar", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();
    login.assertOnLoginPage();
  });

  it("displays error when trying to log in with invalid credentials", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();
    login.loginWith("fake@example.com", "wrong-pass");
    login.assertLoginError();
  });

  it("successfully logs in (credentials via cypress.env.json)", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();
    login.loginWithValid();
    login.assertLoginSuccess();
  });
});
