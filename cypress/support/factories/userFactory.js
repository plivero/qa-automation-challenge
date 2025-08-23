// Centralized payload builder for account creation
export function buildAccountPayload(overrides = {}) {
  return {
    name: "QA AutoTestPedro",
    email: Cypress.env("USER_EMAIL"),
    password: Cypress.env("USER_PASSWORD"),
    title: "Mr",
    birth_date: "10",
    birth_month: "12",
    birth_year: "1990",
    firstname: "QA",
    lastname: "Fixed",
    company: "Test Co",
    address1: "Street 1",
    address2: "Suite 1",
    country: "Canada",
    zipcode: "A1B2C3",
    state: "State",
    city: "City",
    mobile_number: "+1234567890",
    ...overrides, // allow per-test tweaks (e.g., unique email)
  };
}

//helper to generate a unique email when you need to force "created" scenario
export function uniqueEmail(prefix = "test") {
  return `${prefix}_${Date.now()}@mail.com`;
}
