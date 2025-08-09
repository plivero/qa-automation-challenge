// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Regras gerais do projeto
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: ["plugin:@eslint/js/recommended", "js/recommended"], // mantém sua base
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

  // Overrides para os arquivos do Cypress (pages e specs)
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
        assert: "readonly", // opcional (Chai assert)
      },
    },
  },
]);
