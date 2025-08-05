/** @type {import('jest').Config} */
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: [".*\\.browser\\.test\\.ts$"],
    moduleNameMapper: {
        "(.+)\.js$": "$1",
    },
};
