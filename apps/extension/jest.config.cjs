module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  roots: ["<rootDir>/src", "<rootDir>/../tests/extension"],
  testMatch: ["**/*.test.ts?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};
