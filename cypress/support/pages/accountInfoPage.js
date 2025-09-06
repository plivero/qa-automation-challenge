/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

export class AccountInfoPage {
  elements = {
    accountInfoHeader: () => cy.get(".login-form > :nth-child(1)"),
    titleMr: () => cy.get("#id_gender1"),
    passwordInput: () => cy.get('[data-qa="password"]'),

    daySelect: () => cy.get('[data-qa="days"]'),
    monthSelect: () => cy.get('[data-qa="months"]'),
    yearSelect: () => cy.get('[data-qa="years"]'),

    newsletterCheckbox: () => cy.get("#newsletter"),
    optinCheckbox: () => cy.get("#optin"),

    firstNameInput: () => cy.get('[data-qa="first_name"]'),
    lastNameInput: () => cy.get('[data-qa="last_name"]'),
    companyInput: () => cy.get('[data-qa="company"]'),
    address1Input: () => cy.get('[data-qa="address"]'),
    address2Input: () => cy.get('[data-qa="address2"]'),
    countrySelect: () => cy.get('[data-qa="country"]'),
    stateInput: () => cy.get('[data-qa="state"]'),
    cityInput: () => cy.get('[data-qa="city"]'),
    zipcodeInput: () => cy.get('[data-qa="zipcode"]'),
    mobileInput: () => cy.get('[data-qa="mobile_number"]'),

    createAccountBtn: () => cy.get('[data-qa="create-account"]'),
  };

  getAccountInfoHeader() {
    return this.elements.accountInfoHeader();
  }

  selectTitleMr() {
    this.elements.titleMr().check({ force: true });
  }
  typePassword(value) {
    this.elements.passwordInput().clear().type(value);
  }

  selectDay(value) {
    this.elements.daySelect().select(String(value));
  }
  selectMonth(value) {
    this.elements.monthSelect().select(String(value));
  }
  selectYear(value) {
    this.elements.yearSelect().select(String(value));
  }
  selectDOB(day, month, year) {
    this.selectDay(day);
    this.selectMonth(month);
    this.selectYear(year);
  }

  checkNewsletter() {
    this.elements.newsletterCheckbox().check({ force: true });
  }
  checkOptin() {
    this.elements.optinCheckbox().check({ force: true });
  }

  typeFirstName(value) {
    this.elements.firstNameInput().clear().type(value);
  }
  typeLastName(value) {
    this.elements.lastNameInput().clear().type(value);
  }
  typeCompany(value) {
    this.elements.companyInput().clear().type(value);
  }
  typeAddress1(value) {
    this.elements.address1Input().clear().type(value);
  }
  typeAddress2(value) {
    this.elements.address2Input().clear().type(value);
  }
  selectCountry(value) {
    this.elements.countrySelect().select(value);
  }
  typeState(value) {
    this.elements.stateInput().clear().type(value);
  }
  typeCity(value) {
    this.elements.cityInput().clear().type(value);
  }
  typeZipcode(value) {
    this.elements.zipcodeInput().clear().type(value);
  }
  typeMobile(value) {
    this.elements.mobileInput().clear().type(value);
  }

  clickCreateAccount() {
    this.elements.createAccountBtn().click();
  }

  fillAllFields() {
    const password = Cypress.env("USER_PASSWORD") ?? "123456";

    this.selectTitleMr();
    this.typePassword(password);
    this.selectDOB(10, "December", "1990");

    this.checkNewsletter();
    this.checkOptin();

    this.typeFirstName(faker.person.firstName());
    this.typeLastName(faker.person.lastName());
    this.typeCompany(faker.company.name());
    this.typeAddress1(faker.location.streetAddress());
    this.typeAddress2(faker.location.secondaryAddress());
    this.selectCountry("Canada");
    this.typeState(faker.location.state());
    this.typeCity(faker.location.city());
    this.typeZipcode(faker.location.zipCode());
    this.typeMobile(faker.phone.number());
  }
}
