/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  setupFiles: ['<rootDir>/tests/setup/load-env.ts'],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};