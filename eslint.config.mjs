import js from "@eslint/js";
import tseslint from "typescript-eslint";

const fernRules = {
    files: ["src/**/*.ts"],
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "prefer-const": "warn",
    },
};

const humeRules = {
    files: ["src/wrapper/**/*.ts"],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/ban-ts-comment": "error",
        "prefer-const": "error",
    },
};

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["dist", "src/core/**/*.ts", "jest.config.js"],
    },
    {
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.dev.json",
            },
        },
    },
    {
        rules: {
            "@typescript-eslint/no-namespace": "off",
        },
    },
    fernRules,
    humeRules,
];
