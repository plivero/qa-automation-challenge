// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Project rules
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: ["plugin:@eslint/js/recommended", "js/recommended"], // keep the base
    rules: {
      "linebreak-style": ["error", "unix"],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Overrides for Cypress files (pages e specs)
  {
    files: ["cypress/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha, // describe, it, beforeEach, afterEach...
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly", // <- Chai
        assert: "readonly", // optional (Chai assert)
      },
    },
  },
]);
