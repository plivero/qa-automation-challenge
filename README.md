# QA Automation Challenge — Cypress (UI + API)

> Automated test suite (UI + API) for the [Automation Exercise](https://www.automationexercise.com/) application, following best practices such as **Page Object Model (POM)**, **ESLint**, and **CI/CD pipelines with GitHub Actions**.

---

## About

This repository contains an automated test suite designed for both **UI** and **API** testing of the [Automation Exercise](https://www.automationexercise.com/) application.

The main goals of this project are:

- Provide a **realistic QA automation setup** using Cypress with a **Page Object Model (POM)** approach.
- Ensure **code quality and consistency** through ESLint and semantic commits.
- Demonstrate **continuous integration** with GitHub Actions workflows (manual, scheduled, and cross-browser).
- Keep the structure **scalable and maintainable**, separating API tests, platform tests, and personal practice scenarios.

---

## Project Structure

```
qa-automation-challenge/
├─ .github/
│  └─ workflows/ # GitHub Actions workflows
│     ├─ cypress-browsers.yml
│     ├─ cypress-daily.yml
│     └─ cypress-manual.yml
├─ cypress/
│  ├─ e2e/
│  │  ├─ pages/               # Page Objects for UI tests
│  │  └─ specs/
│  │     ├─ api/              # API test specs
│  │     ├─ personalTests/    # Personal and practice scenarios
│  │     └─ platformTests/    # Official tests based on site exercises
│  ├─ fixtures/
│  │  └─ example.json         # Sample fixture data
│  ├─ support/
│  │  ├─ commands.js          # Custom Cypress commands
│  │  └─ e2e.js               # Global test configuration
│  └─ screenshots/            # Local artifacts (ignored in git)
├─ node_modules/
├─ .gitattributes
├─ .gitignore
├─ cypress.config.js
├─ cypress.env.json           # Local environment variables (gitignored)
├─ eslint.config.mjs
├─ package.json
├─ package-lock.json
└─ README.md
```

Note: This structure reflects the current state of the repository. Some folders (e.g., api/, personalTests/) contain multiple test files not fully listed here.

---

## Best Practices

- **Page Object Model (POM)**: all UI interactions are encapsulated in `cypress/e2e/pages/`, improving test readability and maintainability.
- **ESLint enforced**: code style is validated via `eslint.config.mjs`, with LF line endings enforced by `.gitattributes` to ensure cross-platform consistency.
- **Semantic commits**: follow [Conventional Commits](https://www.conventionalcommits.org/).
- **Branch strategy**: one branch per activity/feature (e.g., `feat/ui-tests`, `feat/api-tests`, `docs/readme`).
- **Pull Requests required**: all changes are merged into `main` through PRs, ensuring review and clean history.

---

## Completed Activities

| Step | Description                                                              | Branch               |
| ---- | ------------------------------------------------------------------------ | -------------------- |
| 1    | Project initialized with npm                                             | `feat/init-project`  |
| 2    | ESLint configured                                                        | `feat/eslint`        |
| 3    | Cypress installed and initialized                                        | `feat/ui-tests`      |
| 4    | UI tests added (basic and session flows)                                 | `feat/ui-tests`      |
| 5    | Platform tests added (TC1–TC26: register/login, products, cart, orders…) | `feat/ui-plat-tests` |
| 6    | API tests added (APIs 1–14: products, brands, search, user account)      | `feat/api-tests`     |
| 7    | Manual GitHub Actions workflow for Cypress                               | `feat/pipeline`      |
| 8    | Test case fixes and adjustments                                          | `feat/tcFixes`       |
| 9    | Documentation and text fixes                                             | `feat/textFixes`     |
| 10   | General fixes and improvements                                           | `feat/fixes`         |
| 11   | README documentation                                                     | `docs/readme`        |

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

Cypress uses environment variables to keep sensitive data (such as login credentials) out of the test code.

### Local setup

Create a `cypress.env.json` file in the project root (this file is ignored by git):

```json
{
  "USER_EMAIL": "your_email@example.com",
  "USER_PASSWORD": "your_password",
  "USER_NAME": "Your Name"
}
```

### GitHub Actions (CI)

In GitHub, go to:

**Settings > Secrets and variables > Actions**

Create the following secrets:

- `CYPRESS_USER_EMAIL`
- `CYPRESS_USER_PASSWORD`
- `CYPRESS_USER_NAME`

---

## Test Strategy

The test suite is divided into three main categories:

### API Tests

- Located in `cypress/e2e/specs/api/`.
- Cover the key endpoints of the Automation Exercise API:
  - `GET /api/productsList`
  - `POST /api/productsList` (invalid method handling)
  - `GET /api/brandsList` and invalid methods
  - `POST /api/searchProduct` (valid terms, invalid/no parameter)
  - `PUT /api/updateAccount` (with ensureUser logic)
  - `GET /api/getUserDetailByEmail`
- Built with `failOnStatusCode: false` to handle inconsistent API responses and flakiness.

### Platform Tests

- Located in `cypress/e2e/specs/platformTests/`.
- Directly mapped to the **official Automation Exercise test cases (TC1–TC26)**.
- Include flows such as:
  - User registration and login
  - Product navigation and details
  - Cart management (add, update, remove)
  - Orders & invoices
  - Categories & brands
  - Subscription and scrolling features

### Personal Tests

- Located in `cypress/e2e/specs/personalTests/`.
- Custom scenarios created for training, exploration, and validation of extra edge cases.
- Used as a sandbox to experiment with new Cypress approaches before adding them to the main suites.

---

## CI Pipelines (GitHub Actions)

This project provides three GitHub Actions workflows under `.github/workflows/`:

- `cypress-manual.yml` — **Manual run** of the full suite in **Chrome** (headless).
- `cypress-daily.yml` — **Scheduled daily run** in **Chrome** at **12:00 UTC** (also runnable manually).
- `cypress-browsers.yml` — **Cross-browser** run (Chrome, Edge, Firefox), headless.

### How to trigger

1. Go to **Actions** tab in GitHub.
2. Select the desired workflow:
   - **AutoTests (manual)** → runs the entire suite in Chrome.
   - **Cypress Daily** → scheduled at 12:00 UTC, can also be run manually.
   - **Cypress Browsers** → runs on a browser matrix (Chrome, Edge, Firefox).
3. Click **“Run workflow”** (no inputs are required).

> **Note:** The manual workflow was simplified — workflow inputs were removed and it defaults to running the full test suite in Chrome (headless).

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

## To-Do List

- [x] About section (project scope and goals)
- [x] Project Structure (folder organization)
- [x] Best Practices (coding and workflow standards)
- [x] Completed Activities (history of branches and tasks)
- [x] How to Run (local setup and execution)
- [x] Environment Variables (local and CI configuration)
- [x] Test Strategy (API, platform, personal tests)
- [x] CI Pipelines (manual, daily, cross-browser workflows)
- [x] Troubleshooting (common issues and fixes)
- [x] Enhanced Documentation (README polishing and final structure)
