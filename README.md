# QA Automation Challenge — Cypress (UI + API)

> End-to-end automation suite with **Cypress**, covering UI and API flows of the [Automation Exercise](https://www.automationexercise.com/) platform.

---

## About

This repository contains a complete test suite built with **Cypress**, combining **UI** and **API** coverage.  
The project applies best practices such as Page Object Model, dynamic test data with faker-js, environment variables for secure configuration, code quality enforcement with ESLint, and CI/CD pipelines with GitHub Actions.

---

## Project Structure

```bash
qa-automation-challenge/
├─ .github/
│ └─ workflows/
│ │ ├─ cypress-browsers.yml # Runs manually via GitHub Actions
│ │ └─  cypress-daily.yml # Runs daily 12:00pm
├─ cypress/
│ ├─ e2e/
│ │ ├─ specs/
│ │ │ ├─ apiTests/
│ │ │ └─ uiTests/
│ ├─ fixtures/
│ ├─ screenshots/
│ ├─ support/
│ │ ├─ factories/
│ │ ├─ helpers/
│ │ └─ pages/
├─ cypress.env.json # Local environment variables (added manually)

```

## Folders & Files Overview

- **workflows/** → GitHub Actions workflows.
- **apiTests/** → API endpoint validation.
- **uiTests/** → UI flows (signup, login, cart, checkout, etc.).
- **factories/** → Factories for test data (faker-js) for generating dynamic data.
- **helpers/** → Reusable utilities (`userApi.js` for creating/verifying users via API before UI tests).
- **pages/** → Page Objects(POM) with locators and actions only.

---

## Best Practices

- **Page Object Model (POM):** UI interactions encapsulated in `cypress/support/pages/`, keeping specs clean.
- **faker-js:** used for dynamic test data to avoid collisions.
- **Environment variables:** secure configuration for sensitive values.
- **Semantic commits:** following [Conventional Commits](https://www.conventionalcommits.org/).
- **Code quality:** enforced by ESLint + Prettier.
- **Cross-browser:** validated on Chrome, Edge, and Firefox.
- **Assertion-driven waits:** replace sleeps, leveraging Cypress retry-ability.
- **Timeout tuning:** adjusted to handle slow responses without false negatives.
- **Line endings:** LF enforced to avoid cross-OS conflicts.
- **Platform-specific adaptations:**
  - APIs always return `200`; assertions rely on `statusResponse` in the body.
  - Some endpoints return text instead of JSON; handled with `JSON.parse`.
- **CI-ready:** stable for headless execution in GitHub Actions.

---

## How to Run

### Run Locally

Clone the repository:

```bash
git clone https://github.com/plivero/qa-automation-challenge.git
cd qa-automation-challenge
```

### Install dependencies:

```bash
npm ci
```

### Run Cypress in interactive mode:

```bash
npx cypress open
```

### Run all tests in headless mode:

```bash
npx cypress run
```

### Run specific spec or folder:

```bash
npx cypress run --spec "cypress/e2e/specs/apiTests/*.cy.js"
```

---

## Environment Variables

Sensitive or configurable data is externalized through environment variables.

- **Local development** → stored in `cypress.env.json` (ignored by Git).
- **CI/CD pipelines** → stored as **GitHub Actions secrets**.
- **Dynamic data** → combined with faker-js to generate unique users/inputs per run.

Example (`cypress.env.json`):

```json
{
  "USER_EMAIL": "qa_user@example.com",
  "USER_PASSWORD": "SuperSecret123",
  "USER_NAME": "QA User"
}
```

---

## Test Strategy

### Principles

- **API-first:** fast and stable validations at the base, complemented by UI flows.
- **Readability:** specs contain assertions only.
- **Reusability:** Page Objects contain actions and locators.

### Data

- **faker-js:** generates unique, random values for each run.
- **Environment variables:** provide reusable credentials and safe configuration.
- **API setup:** accounts are created before UI runs, ensuring order-independent execution.

## Test Design

Applied testing techniques to ensure meaningful coverage:

- **Positive/Negative/Edge cases:** applied to both API and UI (valid/invalid inputs, existing/non-existing users).
- **Equivalence Partitioning & Boundary Value Analysis:** cover input ranges such as mandatory fields, limits, and invalid values.
- **Edge cases:** non-existent product search, invalid login, missing required inputs, unexpected API responses.

---

## API Tests

**Location:** `cypress/e2e/specs/apiTests/`

- **Endpoints covered:** products, brands, search, user management.
- **Instability focus:** validates endpoints known to be inconsistent for reliable CI signals.
- **Resilience:** `failOnStatusCode: false` and defensive parsing with `JSON.parse`.
- **Idempotency:** account workflows use “create-if-missing” logic for safe reruns.

---

## UI Tests

**Location:** `cypress/e2e/specs/uiTests/`

- **Critical paths:** signup, login, product navigation, cart, checkout.
- **Maintainability:** implemented with Page Object Model (POM).
- **Stability:** assertion-driven waits for elements; selectors prioritize `data-*`.
- **Cross-browser:** validated in Chrome, Edge, Firefox via CI/CD.  
  Local runs default to `npx cypress run` (Electron), with optional `--browser` for specific cases.
