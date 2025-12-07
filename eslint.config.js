// @ts-nocheck
import { defineConfig } from "eslint/config";
// import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
// import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import expoConfig from "eslint-config-expo/flat.js";

export default defineConfig([
  // Expo's recommended config
  expoConfig,

  // TypeScript support
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      "react-native": reactNative,
      // prettier: prettier,
    },
    rules: {
      /* React Hooks — which are VERY important for RN */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* React Native plugin */
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "off", // inline styles are common in RN
      "react-native/no-single-element-style-arrays": "warn",

      /* TypeScript rules — safe defaults */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",

      /* single quotes are common in TS/JS, so we turn off base rules in favor of Prettier */
      "jsx-quotes": "off",
      "quote-props": "off",
      quotes: "off",

      /* Prettier integration */
      // "prettier/prettier": "warn",
    },
  },

  // Prettier last to override formatting rules
  prettierConfig,

  // Ignore build artifacts
  {
    ignores: ["dist/*", "node_modules/*", ".expo/*"],
  },
]);
