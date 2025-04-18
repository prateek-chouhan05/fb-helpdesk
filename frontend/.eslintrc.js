module.exports = {
  parser: "@babel/eslint-parser",
  plugins: ["react", "import", "jsx-a11y"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    requireConfigFile: false,
  },
  rules: {
    "react/no-deprecated": "warn",
    "import/no-unresolved": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "arrow-body-style": ["warn", "as-needed"],
    "class-methods-use-this": "warn",
    "max-len": [
      "warn",
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "no-underscore-dangle": "off",
    "no-useless-escape": "warn",
    "react/forbid-prop-types": ["warn", { forbid: ["any"] }],
    "react/no-find-dom-node": "error",
    "react/no-string-refs": "warn",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": [
      "error",
      { ignore: ["oallowfullscreen", "msallowfullscreen"] },
    ],
    "react/sort-comp": "warn",
    "react/prop-types": "off",
    camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
    "eol-last": ["error", "always"],
    "spaced-comment": ["error", "always"],
    "sort-vars": ["error", { ignoreCase: true }],
    "comma-spacing": ["error", { before: false, after: true }],
    "key-spacing": ["error", { afterColon: true }],
    "object-curly-spacing": ["error", "always"],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      {
        blankLine: "always",
        prev: ["case", "default", "break"],
        next: "*",
      },
      { blankLine: "any", prev: ["case"], next: ["case", "default"] },
    ],
    "no-trailing-spaces": ["error", { ignoreComments: true }],
    "padded-blocks": ["error", "never"],
    "rest-spread-spacing": ["error", "never"],
    "semi-spacing": ["error"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never", asyncArrow: "always" },
    ],
    "space-unary-ops": ["error"],
    "template-curly-spacing": ["error"],
    "max-lines": [
      "warn",
      { max: 500, skipBlankLines: true, skipComments: true },
    ],
    "default-param-last": "warn",
    "no-promise-executor-return": "error",
    "no-async-promise-executor": "error",
    "max-classes-per-file": ["warn", 1],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-continue": "off",
    "prefer-const": [
      "error",
      {
        destructuring: "all",
      },
    ],
    "no-debugger": 0,
    "no-alert": 0,
    "no-await-in-loop": 0,
    "no-return-assign": ["error", "except-parens"],
    "no-restricted-syntax": [
      2,
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    // NOTE: commenting this, since project is in initial state
    // "import/no-unused-modules": [
    //   2,
    //   { "unusedExports": true, "ignoreExports": ["src/app/api/**/*"] }  // Exclude next API routes exports as they are used dynamicallly by the framework
    // ],
    "no-use-before-define": ["error", { functions: true, classes: true }],
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          ["internal", "parent", "sibling", "index"],
          "type",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "prefer-destructuring": [
      "error",
      {
        array: false,
        object: true,
      },
    ],
    "import/imports-first": ["warn"],
    "no-inline-comments": ["off"],
    "no-param-reassign": "error",
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
};
