import { faker } from "@faker-js/faker";

export function buildAccountPayload(overrides = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    title: "Mr",
    birth_date: faker.number.int({ min: 1, max: 28 }).toString(),
    birth_month: faker.number.int({ min: 1, max: 12 }).toString(),
    birth_year: faker.date.past({ years: 30 }).getFullYear().toString(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.location.country(),
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
    ...overrides,
  };
}

// Helper: generate a fresh payload but keep the original email/password
export function buildUpdatedPayload(original) {
  return {
    ...buildAccountPayload(),
    email: original.email, // keep same email
    password: original.password, // keep same password
  };
}
export const searchTerms = {
  valid: "top",
  anotherValid: "dress",
  invalid: "xxxxx",
};

// Invalid credentials (for negative login scenarios)
export const invalidCredentials = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

// Edge cases for account creation
export const accountEdgeCases = {
  emptyFields: {
    email: "",
    password: "",
  },
  invalidEmailFormat: {
    email: "invalid-email-format",
  },
};

export function buildBrandPayload() {
  return {
    id: faker.number.int({ min: 1, max: 999999 }).toString(),
    brand: faker.word.sample(),
  };
}

/* -------------------------------
   Search product payload builders
   Purpose: keep specs free of hardcoded inputs and centralize variants.
   These functions do not duplicate anything existing in this file.
-------------------------------- */

// Happy path payload using the already-declared searchTerms.valid
export function buildSearchPayloadValid() {
  return { search_product: searchTerms.valid };
}

// Missing parameter entirely -> API should return 400
export function buildSearchPayloadMissing() {
  return {};
}

// Parameter present but empty string -> API treats as missing (400)
export function buildSearchPayloadEmpty() {
  return { search_product: "" };
}

// Wrong parameter name -> API treats as missing (400)
export function buildSearchPayloadWrongName() {
  return { wrong_field: faker.word.sample() };
}
