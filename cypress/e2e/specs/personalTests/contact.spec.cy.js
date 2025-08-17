// @ts-check
/// <reference types="cypress" />

import { HomePage } from "../../pages/homePage";
import { ContactUsPage } from "../../pages/contactUsPage";

const home = new HomePage();
const contact = new ContactUsPage();

describe("Contact Us - Envio de formulário", () => {
  it("preenche e envia com sucesso usando credenciais do env", () => {
    const name = Cypress.env("USER_NAME");
    const email = Cypress.env("USER_EMAIL");

    if (!name || !email) {
      throw new Error(
        "Credenciais ausentes. Defina USER_NAME e USER_EMAIL em cypress.env.json"
      );
    }

    // navega via navbar (mais real)
    home.visit();
    home.getNavMenuItem("Contact us").click();

    // garante que está na página de contato
    cy.url().should("include", "/contact_us");

    // preenche e envia (usa suas credenciais)
    contact.fillForm({
      name,
      email,
      subject: "Automation Exercise - Contact",
      message: "Mensagem de teste enviada pelo Cypress.",
    });
    contact.submit();

    // valida sucesso
    contact.assertSuccess();
  });
});
