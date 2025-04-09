import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, import: importPlugin },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      indent: [2, 2, { SwitchCase: 1 }],
      "linebreak-style": [0, "unix"],
      quotes: [2, "double"],
      semi: [2, "always"],
      "no-inline-comments": [0],
      "arrow-body-style": [1],
      "class-methods-use-this": [0],
      "comma-dangle": [0],
      "import/imports-first": [1], // This rule now should work
      "max-len": [
        1,
        {
          code: 80,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreStrings: true,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "no-underscore-dangle": [0],
      "no-useless-escape": [0],
      "no-console": [0],
      "consistent-return": "warn",
      "no-useless-catch": "off",
    },
  },
]);
