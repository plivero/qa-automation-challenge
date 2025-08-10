import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

const home = new HomePage();
const login = new LoginPage();

describe("Signup / Login flow (POM)", () => {
  afterEach(() => {
    // Só tenta deslogar se o link existir na página
    cy.get("body").then(($body) => {
      const hasLogout = $body.find('a[href="/logout"]').length > 0;
      if (hasLogout) {
        cy.get('a[href="/logout"]').click({ force: true });
      }
    });
  });

  it("navega até a página de login pela navbar", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();
    login.assertOnLoginPage();
  });

  it("exibe erro ao tentar logar com credenciais inválidas", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();
    login.loginWith("fake@example.com", "wrong-pass");
    login.assertLoginError();
  });

  it("realiza login com sucesso (credenciais via cypress.env.json)", () => {
    home.visit();
    home.getNavMenuItem("Signup / Login").click();
    login.loginWithValid();
    login.assertLoginSuccess();
  });
});
