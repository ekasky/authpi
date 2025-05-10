/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  setupFiles: ['<rootDir>/tests/setup/load-env.ts'],
  // Only collect coverage from source files
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};