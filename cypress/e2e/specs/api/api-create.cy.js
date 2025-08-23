import {
  buildAccountPayload /*, uniqueEmail */,
} from "../../../support/factories/userFactory";

describe("API create - Create Account with data from .env", () => {
  it("creates account idempotently (create or acknowledge existing)", () => {
    // If you ever want to force a fresh creation, use:
    // const payload = buildAccountPayload({ email: uniqueEmail() });

    const payload = buildAccountPayload();

    return cy
      .request({
        log: false,
        method: "POST",
        url: "/api/createAccount",
        form: true,
        failOnStatusCode: false, // we'll assert manually
        body: payload,
      })
      .then(({ status, body }) => {
        // Defensive parse: API may return JSON as a string
        const data = typeof body === "string" ? JSON.parse(body) : body || {};
        const message = String(data.message || "");

        // Accepted outcomes (idempotent contract)
        const ACCEPTED_STATUS = [201, 200, 409];
        const ACCEPTED_MESSAGE =
          /(user created!?|(?:user|email)(?: already)? (?:created|exist)s?!?)/i;

        // Assertions (no branching needed)
        expect(ACCEPTED_STATUS, `unexpected status: ${status}`).to.include(
          status
        );
        expect(message, `unexpected message: "${message}"`).to.match(
          ACCEPTED_MESSAGE
        );
      });
  });
});
