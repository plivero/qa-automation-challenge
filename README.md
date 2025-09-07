# QA Automation Challenge — Cypress (UI + API)

> Automated test suite (UI + API) for the [Automation Exercise](https://www.automationexercise.com/) application, following best practices such as **Page Object Model (POM)**, **ESLint**, and **CI/CD pipelines with GitHub Actions**.

---

## About

This repository contains an automated test suite designed for both **UI** and **API** testing of the [Automation Exercise](https://www.automationexercise.com/) application.

The main goals of this project are:

- Provide a **realistic QA automation setup** using Cypress with a **Page Object Model (POM)** approach.
- Ensure **test data variability** with **faker-js** to generate dynamic users and inputs.
- Keep tests **clean and maintainable** by refactoring duplicates into consolidated scenarios.
- Ensure **code quality and consistency** through ESLint and semantic commits.
- Demonstrate **continuous integration** with GitHub Actions workflows (manual, scheduled, and cross-browser).
- Keep the structure **scalable**, separating API tests, UI platform tests, and exploratory edge cases.

---

## Project Structure

```
qa-automation-challenge/
├─ .github/
│ └─ workflows/ # GitHub Actions workflows
├─ cypress/
│ ├─ downloads/ # Downloaded files (ignored in git)
│ ├─ e2e/
│ │ ├─ specs/
│ │ │ ├─ apiTests/ # API test specs
│ │ │ └─ uiTests/ # UI test specs (platform-based TCs)
│ │ └─ fixtures/ # Fixture data
│ ├─ screenshots/ # Local artifacts (ignored in git)
│ ├─ support/
│ │ ├─ factories/ # Factories for test data (faker-js)
│ │ ├─ pages/ # Page Objects
├─ .gitattributes
├─ .gitignore
├─ cypress.config.js
├─ cypress.env.json # Local environment variables (added manually)
├─ eslint.config.mjs
├─ package.json
├─ package-lock.json
└─ README.md
```

Note: This structure reflects the current state of the repository. Some folders (e.g., api/, personalTests/) contain multiple test files not fully listed here.

---

## Best Practices

- **Page Object Model (POM):** all UI interactions encapsulated under `cypress/support/pages/`.
- **faker-js:** dynamic and unique data generation for account creation, logins, and other flows.
- **Semantic commits:** follow [Conventional Commits](https://www.conventionalcommits.org/).
- **Code style enforced with ESLint:** consistent rules defined in `eslint.config.mjs`.
- **Refactor-first approach:** redundant personal specs consolidated into platform tests (e.g., add-to-cart, login/logout, product search).
- **CI-ready:** tests are stable for headless and cross-browser runs.

---

## How to Run

### Run Locally

Clone the repository:

```bash
git clone https://github.com/plivero/qa-automation-challenge.git
cd qa-automation-challenge
```

Install dependencies:

```bash
npm ci
```

Run Cypress in interactive mode:

```bash
npx cypress open
```

Run all tests in headless mode:

```bash
npx cypress run --browser chrome
```

Run specific spec or folder:

```bash
npx cypress run --browser chrome --headless --spec "cypress/e2e/specs/api/*.cy.js"
```

---

## Environment Variables

In order to keep the test suite secure, portable, and easy to maintain, this project makes extensive use of environment variables. Rather than hardcoding sensitive information directly into the test code (such as login credentials or credit card numbers), all sensitive or configurable data is isolated into local configuration files or injected through CI/CD secrets. This approach ensures that the same tests can run seamlessly across different environments without modifying the test logic.

There are three key aspects to how environment variables are handled:
-Separation of sensitive data
-For local development, values are stored in cypress.env.json, which is ignored by Git. This prevents credentials from being committed to the repository.
-In CI/CD pipelines, the same values are managed through GitHub Actions secrets, ensuring no sensitive data is ever exposed in the source code.

Dynamic test data with Faker
-Many flows (such as user registration or form submissions) require unique values for each execution.
-The project uses @faker-js/faker
to generate random names, emails, and descriptions.
-Example: instead of reusing qa_user@example.com, the test might generate something like ui_16933567123_abcd@example.com, preventing conflicts with existing test records.

Fallback and static defaults
-When a variable is not defined in the environment, the code falls back to static defaults.
-This is especially useful for deterministic test values, such as a test credit card number (4111111111111111) or the placeholder user name “QA User.”
-With this setup, the suite is both flexible (when environment-specific data is provided) and practical (when running with defaults).
-Overall, environment variables make the test suite portable, consistent, and safe. You can run the exact same tests locally, in staging, or in CI/CD pipelines without changing the test files.

Example of a local cypress.env.json:
{
"USER_EMAIL": "qa_user@example.com",
"USER_PASSWORD": "SuperSecret123",
"USER_NAME": "QA User"

}

Usage inside specs:
const email = Cypress.env("USER_EMAIL");
const name = Cypress.env("USER_NAME");

## Test Strategy

### Guiding Principles

The design of this test suite follows a clear set of principles to ensure **reliability, maintainability, and meaningful coverage**. Rather than focusing on sheer quantity of tests, the emphasis is on testing what matters most: the flows and components that deliver the greatest value to users and the business.

The strategy combines **Risk-Based Testing** with the **Testing Pyramid**:

- At the foundation are **API tests**, which are fast, stable, and cover most of the functional logic without relying on the UI.
- On top of that, **critical UI end-to-end flows** are tested, such as login, checkout, or project approval. These flows validate that the system works as expected from the user’s perspective.
- Finally, **exploratory and edge scenarios** complement the suite, ensuring that unusual but important cases are not overlooked.

This layered approach provides a balance between **speed** and **confidence**: we avoid overloading the suite with brittle UI tests, but we still validate the user experience where it truly matters.

---

### Risk-Based Prioritization

Not every feature carries the same risk. Test coverage is prioritized using an **Impact × Likelihood** model:

- **High-risk areas** include user account creation, login, checkout, and approval workflows. These are tested thoroughly because failures here would block critical business operations.
- **Medium risk** areas, such as search functionality or cart persistence, are validated to ensure smooth user interactions.
- **Lower risk** aspects, such as static labels or secondary navigation, receive lighter coverage, often through exploratory tests.

---

### Test Design Techniques

To maximize efficiency and clarity, the following techniques are applied:

- **Equivalence Partitioning**: testing representative valid and invalid inputs instead of every possible variation.
- **Boundary Value Analysis**: focusing on values at the edges, where defects are most likely (e.g., quantity = 0, 1, max).
- **Positive, Negative, and Edge Cases**: ensuring each scenario is explicitly validated with simple, deterministic assertions.

---

### Data Management

Data consistency is critical in automation. This project uses a hybrid approach:

- **Environment variables** manage sensitive data such as credentials.
- **Faker-generated values** are used for free-text fields to guarantee uniqueness and independence between test runs.
- **Static fallbacks** are applied for deterministic flows, so tests never fail just because environment variables are missing.

---

### Maintainability

The suite is designed to be **easy to read, extend, and maintain**:

- The **Page Object Model (POM)** is strictly enforced: Page Objects contain only locators and actions, while assertions live in the specs.
- Specs are intentionally kept “clean and simple” — one assertion per line, no loops, no “clever” JavaScript tricks. This makes the tests easy to read and maintain even for junior QAs.
- Defaults and helpers reduce boilerplate without hiding test intent.

---

### Non-Functional Practices

Beyond functional coverage, the suite also considers **quality of execution** and **pipeline readiness**:

- **Cross-browser validation**: tests run in Chrome, Edge, and Firefox via CI pipelines to ensure consistent user experience.
- **Daily scheduled runs**: a full regression suite executes daily, catching regressions early even when no new code is pushed.
- **Code quality enforcement**: ESLint and Prettier ensure consistent coding style and readability across all tests and Page Objects.
- **Smart synchronization**: explicit waits are avoided whenever possible, replaced by Cypress’ built-in retry-ability (`.should("be.visible")`, `.should("exist")`). This ensures stability while keeping tests fast.

### Why these tests

- Cover **business-critical paths first** (account lifecycle: signup → login/logout) and **high-usage flows** (product listing/details/search, cart operations, checkout-like flows defined in the platform test cases).
- Address **known risks**: API flakiness (always returning status 200 instead of 4xx/405), body returned as **string** instead of JSON, and intermittent UI behaviors.
- Provide **idempotent executions**: tests create a user **only if not existing** and proceed otherwise, enabling safe reruns in CI without brittle cleanup.
- Ensure **cross-browser reliability**, running the suite in **Chrome, Firefox, and Edge**, including Dockerized containers in GitHub Actions to validate consistency in multiple environments.

### Test design concepts used

- Positive/Negative/Edge cases for both UI and API (valid vs. invalid search terms, existing vs. non-existing users, cart with items vs. empty cart).
- Equivalence Partitioning & Boundary Value Analysis to reduce duplication while probing relevant input classes and edge conditions (e.g., missing mandatory fields, maximum field length).
- Dynamic test data with faker-js: all user inputs (names, emails, passwords, addresses, phone numbers) are generated dynamically. This ensures uniqueness per execution and avoids brittle tests blocked by reused data.
- Reusability & Maintainability: test interactions centralized in **Page Objects** (`ProductsPage`, `CartPage`, `LoginPage`, `AccountInfoPage`, etc.), reducing duplication and making flows consistent across specs.
- Stability techniques: assertion-driven waits, resilient selectors, defensive parsing for API responses, and tolerant assertions where the application exhibits known inconsistencies.
- Edge cases (progressively expanding):
  - Non-existent products in search
  - Invalid login attempts
  - Submitting required forms with missing inputs

---

### API Tests

**Location:** `cypress/e2e/specs/apiTests/`

**Scope & Selection**

- Validate the key Automation Exercise endpoints:
  - `GET /api/productsList`
  - `POST /api/productsList` _(invalid method handling)_
  - `GET /api/brandsList` and invalid methods
  - `POST /api/searchProduct` _(valid terms; invalid/no parameter)_
  - `PUT /api/updateAccount` _(with ensure-user logic via create-if-absent)_
  - `GET /api/getUserDetailByEmail`
- Rationale: API coverage gives **fast feedback** and detects issues earlier (Testing Pyramid). Endpoints with known instability were explicitly covered to ensure reliability of the CI signal.

**Stability & Resilience**

- `failOnStatusCode: false` to capture **inconsistent status codes** and assert on either HTTP status **or** payload fields when the server returns `200` with `{ responseCode: 4xx/405 }`.
- Conditional parsing when `res.body` comes as **string**:
  ```js
  const data = JSON.parse(body);
  ```
- Idempotent user workflow: **create if missing**, **confirm if existing**, then proceed to update/verify; allows **safe reruns** without manual reset.

---

### Platform (UI) Tests

**Location:** `cypress/e2e/specs/uiTests/`

**Scope**

- End-to-end coverage of the official site exercises: registration/login, product navigation & details, search, cart (add/update/remove), orders & invoices, categories/brands, subscription, and scrolling features.

**Design & Maintainability**

- **POM (Page Object Model)**: UI interactions encapsulated in `cypress/e2e/pages/` to keep specs readable and facilitate reuse (e.g., account creation/login flows reused across scenarios).
- **Selectors & waits**: prefer `data-*` when available; otherwise, use stable semantic selectors. Replace fixed sleeps with **assertion-driven waits** (e.g., `should('be.visible')`, `should('contain')`).

**Cross-environment**

- Validated in **headless Chrome** (manual workflow) and **browser matrix** (Chrome, Edge, Firefox). Differences are mitigated by resilient selectors and timing-robust assertions.

---

**Purpose**

- Exploratory and training scenarios used to assess **edge cases**, experiment with Cypress approaches, or quickly validate hypotheses before promotion.

**Promotion criteria**

- When a personal spec proves valuable and stable, it is **promoted** to the appropriate suite (API or platform) to expand official coverage without bloating the main specs prematurely.

---

### Data, Secrets & Configuration

- Sensitive data lives in `cypress.env.json` (local) and GitHub **Actions Secrets** (CI).
- This isolates credentials from code and enables reproducible runs across environments.

---

## CI Pipelines (GitHub Actions)

This project provides two GitHub Actions workflows under `.github/workflows/`:

- `cypress-manual.yml` — **Manual run** of the full suite in **Chrome, Edge, Firefox** (headless, with matrix and Docker container).
- `cypress-automatic.yml` — **Automatic scheduled run** of the full suite in **Chrome, Edge, Firefox** (headless, with matrix and Docker container).

### How to trigger

1. Go to the **Actions** tab in GitHub.
2. Select the desired workflow:
   - **Cypress Manual** → runs the entire suite manually in **Chrome, Edge, Firefox** (headless, using matrix + Docker container).
   - **Cypress Automatic** → scheduled run of the entire suite in **Chrome, Edge, Firefox** (headless, using matrix + Docker container).
3. Click **“Run workflow”** (no inputs are required).

> **Note:** The manual workflow was simplified — workflow inputs were removed and it defaults to running the full test suite across all three browsers (headless).

Make sure the required secrets are configured (see **Environment Variables** section).

---

## Troubleshooting

### API returns HTTP 200 for invalid methods (expected 405)

Some endpoints may respond with `200` but include an error payload (e.g., `responseCode: 405`).  
**Fix:** send requests with `failOnStatusCode: false` and assert either HTTP status **or** payload fields.

### Response body comes as a string (not JSON)

The API sometimes returns JSON as a plain string.  
**Fix:** parse conditionally with `JSON.parse` when needed.

### CI run used older code/branch

Manual runs can be triggered while another branch is checked out.  
**Fix:** verify the run’s commit SHA and branch in Actions → Run details. Re-run after merging to `main`.

### Missing environment variables (local or CI)

Tests that depend on credentials will fail if env vars are absent.  
**Fix:** ensure `cypress.env.json` exists locally and GitHub Secrets are set.

### Line ending issues (Windows vs. Linux)

Git diffs or ESLint errors due to CRLF/LF differences.  
**Fix:** `.gitattributes` enforces LF; reset files and commit again if needed.

### Flaky timing / loaders on UI flows

Dynamic pages may need extra waits for network/DOM stability.  
**Fix:** use assertion-driven waits (e.g., `should('be.visible')`) or helpers to wait for spinners to disappear.

### Headless Chrome differs from interactive mode

Headless can behave slightly differently (viewport, timing).  
**Fix:** align configs and reproduce locally with `npx cypress run --browser chrome --headless`.

### Cross-browser matrix failures (browsers workflow)

Selectors or CSS timing may differ on Firefox/Edge.  
**Fix:** avoid brittle selectors (prefer data-\* attributes) and validate assumptions.

### Rate limits or CAPTCHA-like behaviors

Multiple fast login attempts can trigger anti-abuse responses.  
**Fix:** reuse sessions when possible and space out login attempts in parallel runs.

---
