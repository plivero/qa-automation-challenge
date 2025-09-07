# QA Automation Challenge — Cypress (UI + API)

> End-to-end test automation with **Cypress** for the [Automation Exercise](https://www.automationexercise.com/) platform.

## About

This repository contains a complete test suite built with **Cypress**, combining **UI** and **API** coverage.  
It demonstrates how Cypress can be applied across the full testing lifecycle — from API requests to browser flows — using modern best practices.

The project demonstrates how Cypress can be applied end-to-end, from API requests to browser flows, using modern best practices:

- **Page Object Model (POM)** for UI interactions
- **faker-js** for dynamic test data
- **Environment variables** for secure and portable configuration
- **ESLint + semantic commits** for code quality and consistency
- **GitHub Actions** workflows (manual, scheduled, cross-browser) for CI/CD
- **Scalable structure**, separating API tests and UI tests.

---

## Project Structure

```
qa-automation-challenge/
├─ .github/
│ └─ workflows/ # GitHub Actions workflows
│ │ ├─ cypress-browsers.yml # Runs manually via GitHub Actions
│ │ └─  cypress-daily.yml # Runs daily 12:00pm
├─ cypress/
│ ├─ e2e/
│ │ ├─ specs/
│ │ │ ├─ apiTests/ # API test specs
│ │ │ └─ uiTests/ # UI test specs
│ ├─ support/
│ │ ├─ factories/ # Factories for test data (faker-js)
│ │ └─  pages/ # Page Objects
├─ cypress.env.json # Local environment variables (added manually)

```

## Folders & Files Overview

### .github/workflows/

Contains GitHub Actions pipelines.

- cypress-browsers.yml: runs the suite manually across Chrome, Edge, and Firefox.

- cypress-daily.yml: runs the full regression suite daily at 12:00pm.

### cypress/e2e/specs/

Stores test specifications.

- apiTests/: all API specs validating endpoints (productsList, brandsList, searchProduct, etc.).

- uiTests/: all UI specs covering user flows (signup, login, cart, checkout, etc.).

### cypress/support/

Shared support layer for tests.

- factories/: helper files that generate test data using faker-js. Ensures unique inputs per run.

- pages/: Page Object Models (POM). Each page file contains only locators and actions, keeping specs clean.

### cypress.env.json

Local environment variables (ignored by Git). Used for credentials or fixed test data. Equivalent secrets must be set in GitHub Actions for CI/CD.

## Root Files

### package.json

Defines project dependencies and scripts.

- Main deps: cypress, @faker-js/faker, eslint.
- Scripts include shortcuts like cypress open, cypress run, and linting commands.
- ensures consistent runs across local and CI environments.

### package-lock.json

Auto-generated file that locks dependency versions.

- Guarantees consistent installs across machines and pipelines.

### eslint.config.mjs

Central config for ESLint.

- Enforces code style and best practices (naming, formatting, imports).
- Keeps Page Objects and specs consistent in syntax.

### .gitignore

Prevents unnecessary or sensitive files from being committed.

- Includes node_modules/, cypress.env.json, and temporary Cypress artifacts.

### .gitattributes

Normalizes line endings (LF vs CRLF) to avoid cross-OS conflicts.

- Useful when running CI on Linux and developing on Windows.

### README.md

Primary documentation file

- Provides context, setup instructions, and project overview.

---

## Best Practices

- **Page Object Model (POM):** UI interactions are abstracted in cypress/support/pages/. POs expose only locators and actions, while assertions remain in the specs.
- **faker-js:** used for dynamic test data (users, inputs, form fields). Guarantees unique values per run and avoids collisions with existing records.
- **Semantic commits:** commits follow Conventional Commits for consistent version history and changelog generation.
- **Code style enforced with ESLint:** enforced via eslint.config.mjs to maintain uniform code style across Page Objects, specs, and helpers.
- **Refactor-first approach:** duplicate specs are consolidated into maintainable test flows (e.g., login/logout, cart, product search).
- **CI-ready:** tests are stable for headless execution and validated across multiple browsers (Chrome, Edge, Firefox).

---

## How to Run

### Run Locally

Clone the repository:

```bash
git clone https://github.com/plivero/qa-automation-challenge.git
cd qa-automation-challenge
```

## Install dependencies:

```bash
npm ci
```

## Run Cypress in interactive mode:

```bash
npx cypress open
```

## Run all tests in headless mode:

```bash
npx cypress run --browser chrome
```

## Run specific spec or folder:

```bash
npx cypress run --browser chrome --headless --spec "cypress/e2e/specs/apiTests/*.cy.js"
```

## **@faker-js/faker** setup (dynamic data generation)

### Installation

> Installed automatically via `npm ci`.  
> To install manually (or in forks without lockfile):

```bash
npm i -D @faker-js/faker
```

### Suggested structure

```
cypress/
├─ support/
│  ├─ factories/
│  │  └─ userFactory.js
```

---

## Code Quality (ESLint & Prettier) - Formatting rules

### Installation

> Installed automatically via `npm ci`.  
> To install manually:

```bash
npm i -D eslint prettier
```

### Configuration

- **eslint.config.mjs** defines linting rules.
- **Prettier** enforces consistent formatting.

Run locally:

```bash
npx eslint .
npx prettier --write .
```

---

### CI Executions - `.github/workflows/`

- **Manual trigger** → Chrome, Edge, Firefox
- **Daily schedule** → Chrome, Edge, Firefox

---

## Environment Variables

This project uses **environment variables** to keep tests secure, portable, and easy to maintain.  
Sensitive or configurable data is never hardcoded in the test code.

- **Local development** → stored in `cypress.env.json` (ignored by Git).
- **CI/CD pipelines** → stored as **GitHub Actions secrets**.
- **Dynamic data** → combined with [faker-js](#faker-setup) to generate unique users/inputs per run.
- **Static fallbacks** → if a variable is missing, the suite uses safe defaults.

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

### Guiding Principles

This was my **first complete project end-to-end**, covering the full lifecycle: environment setup, exploratory testing, API validation, UI validation, and CI/CD integration with GitHub Actions.  
I started with **personal exploratory tests** based on my intuition and previous training, then followed the **API and UI test lists** provided by the Automation Exercise platform. Along the way, I consolidated overlapping scenarios and removed duplicates, which was an important part of the learning process.

### Risk-Based Prioritization

Although not defined as a formal risk strategy, the focus naturally went to:

- **Critical flows**: signup, login, account management.
- **API endpoints**: followed the platform’s suggested order, starting with products, brands, and search.
- **UI tests**: end-to-end flows such as cart operations and checkout.  
  Less critical or static features were validated with lighter coverage.

### Data Management

- **faker-js** → used to generate unique random values for users and form inputs.
- **Environment variables (.env)** → used for safe, repeatable credentials and accounts required as pre-conditions.  
  This combination allowed flexibility (randomized test runs) and stability (deterministic flows when needed).

### Maintainability

- **Page Object Model (POM)** strictly applied in UI tests: Page Objects hold only locators and actions, while assertions remain in specs.
- **Factories** created for API payloads, so specs are reduced to simple calls and validations.
- **Consolidation**: personal exploratory tests were merged into the official platform cases to avoid redundancy.

### Non-Functional Practices

- **Cross-browser runs**: validated in Chrome, Edge, and Firefox.
- **Smart waits**: Cypress waits ensure elements are visible before continuing, avoiding flaky steps.
- **Timeout adjustments**: tuned to handle platform delays without false negatives.
- **Code quality**: ESLint and Prettier enforce consistent style.
- **Line endings**: LF enforced to run consistently across Windows and Linux environments.
- **Platform-specific adaptations**:
  - API endpoints always return **HTTP 200**, regardless of success or error. Assertions are therefore based on a `statusResponse` field inside the response body (e.g., 200, 201, 404).
  - Response `content-type` is often **HTML/text instead of JSON**. Tests handle this by parsing strings with `JSON.parse` to avoid runtime errors.

### Why these tests

The test flow mirrors my learning curve:

1. Start exploratory with the **most important flows** (signup, login).
2. Expand through the **API test list** suggested by the platform.
3. Complete with the **UI test list**, consolidating duplicates and stabilizing runs.

This approach resulted in a suite that is not based on a rigid strategy, but instead reflects **practical coverage, continuous learning, and real-world execution**.

## Test Design Concepts

This project applies several design techniques to keep the suite **robust, reusable, and maintainable**.

### Functional Coverage

- **Positive / Negative / Edge cases** applied to both API and UI flows.  
  Examples:

  - Valid vs. invalid search terms
  - Existing vs. non-existing users
  - Cart with items vs. empty cart
  - Submitting required forms with missing inputs

- **Equivalence Partitioning & Boundary Value Analysis** used to minimize duplication while covering critical ranges.  
  Examples:
  - Mandatory vs. optional fields
  - Maximum field length
  - Invalid numeric ranges

### Data Strategies

- **faker-js** → generates unique values for names, emails, passwords, and addresses, avoiding collisions between runs.
- **Environment variables** → provide reusable, stable accounts for flows that require a pre-existing user.
- **Static fallbacks** → deterministic defaults when environment variables are not set.
- **Test independence via API setup** → UI tests that require an existing account start by creating a user through the API.  
  This ensures every test is self-contained and can run in any order without relying on side effects from previous tests.

### Reusability & Maintainability

- **Page Object Model (POM):** all UI interactions centralized in Page Objects (`ProductsPage`, `CartPage`, `LoginPage`, `AccountInfoPage`, etc.), keeping specs focused on validations.
- **Factories for API tests:** payloads and defaults defined in factories, so specs only contain calls and assertions.

### Stability Techniques

- **Assertion-driven waits** → rely on Cypress retry-ability (`.should("be.visible")`) instead of fixed sleeps.
- **Resilient selectors** → prefer `data-*` attributes or semantic locators to reduce fragility.
- **Platform-specific adaptations:**
  - APIs always return **HTTP 200**; validations are based on a `statusResponse` field inside the body.
  - Some endpoints return payloads as **HTML/text instead of JSON**; responses are parsed with `JSON.parse` to avoid breaking the tests.
- **Tolerant assertions** → used where the platform shows known inconsistencies.

### Edge Cases (progressively expanded)

- Searching for non-existent products
- Invalid login attempts
- Submitting required forms with missing inputs
- Handling unexpected API responses (e.g., wrong content-type, error payloads inside 200 status)

---

## API Tests

**Location:** `cypress/e2e/specs/apiTests/`

API coverage was built following the **suggested test order** from the Automation Exercise platform, expanded with personal exploratory cases.  
The focus was on endpoints with **higher instability** (e.g., products, brands, search, user management) to ensure reliability in CI/CD runs.

Key practices:

- **Fast feedback**: API tests validate functional logic without UI overhead.
- **Resilience**: `failOnStatusCode: false` to capture inconsistent responses and `JSON.parse` applied when responses come as plain text instead of JSON.
- **Idempotency**: account-related tests use a “create-if-missing” workflow, so reruns are safe and independent.

---

## UI Tests

**Location:** `cypress/e2e/specs/uiTests/`

UI coverage follows the **platform’s official exercise list**, complemented with exploratory flows.  
The focus was on **business-critical paths** (signup, login, cart, checkout, product navigation) and on validating real user interactions across browsers.

Key practices:

- **Maintainability**: Page Object Model (POM) applied consistently (see [Test Design Concepts](#test-design-concepts)).
- **Stability**: Assertion-driven waits instead of fixed sleeps; selectors prioritize `data-*` when available.
- **Cross-browser validation**: Chrome, Edge, and Firefox via CI workflows.
- **Promotion workflow**: Exploratory specs are promoted into the main suite only after proving stable and valuable.

## CI/CD Pipelines

Two GitHub Actions workflows are provided under `.github/workflows/`:

- **cypress-manual.yml** → on-demand execution across Chrome, Edge, Firefox (headless).
- **cypress-automatic.yml** → scheduled daily run across the same browsers.

> Note: Both workflows require the appropriate environment variables configured as **GitHub Actions Secrets**.  
> See [Environment Variables](#environment-variables) for details.

---

## Troubleshooting

Common issues and quick fixes when running the suite:

- **API responses**

  - Some endpoints always return `200`, even on errors → assert on `responseCode` in the body (`failOnStatusCode: false`).
  - Payload may come as plain text instead of JSON → wrap with `JSON.parse` before assertions.

- **Environment variables**

  - Missing or incorrect credentials cause test failures → ensure `cypress.env.json` (local) and GitHub Secrets (CI) are configured.

- **Code consistency**

  - CRLF/LF issues between Windows/Linux → enforced with `.gitattributes`; reset and recommit if needed.

- **UI stability**

  - Timing differences (spinners, loaders, headless vs. interactive, browser matrix) → use assertion-driven waits and resilient selectors (`data-*` preferred).

- **CI/CD runs**
  - Manual runs may pick up an old branch → check commit SHA in Actions before re-running.
  - Rapid login attempts can trigger rate limits → reuse sessions or space login retries.

---
