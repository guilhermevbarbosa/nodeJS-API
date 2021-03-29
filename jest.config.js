module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["text-summary", "lcov"],

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/*.spec.ts"],
};
