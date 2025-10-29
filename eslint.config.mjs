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
            // Enforce explicit file extensions in imports to prevent directory needing resolution
            // This prevents issues like: import * from "./wrapper" (should be "./wrapper/index.js")
            "@typescript-eslint/consistent-type-imports": "off",
        },
    },
    {
        // Custom rule configuration to catch directory imports without explicit index file
        files: ["src/**/*.ts"],
        rules: {
            // Prevent directory imports - require explicit file paths with extensions
            // This catches patterns like: from "./wrapper" or from "../wrapper"
            // but allows: from "./wrapper/index.js" or from "./file.js"
            "no-restricted-syntax": [
                "error",
                {
                    // Match ImportDeclaration nodes where source.value matches:
                    // - Starts with ./ or ../ 
                    // - Single directory name (no slashes or dots after the directory)
                    // - No file extension
                    // This will catch: "./wrapper" but allow "./wrapper/index.js" and "./file.js"
                    selector: "ImportDeclaration[source.value=/^\\.\\.?\\/[^./]+$/]",
                    message: "Directory imports without explicit index file are not allowed. Use explicit file paths with extensions (e.g., './wrapper/index.js' instead of './wrapper'). This prevents ES module resolution errors.",
                },
            ],
        },
    },
    fernRules,
    humeRules,
];
