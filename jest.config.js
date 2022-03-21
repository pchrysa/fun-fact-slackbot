// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/*.d.ts',
    '!**/__tests__/*.ts',
    '!node_modules/**/*',
    '!**/node_modules/**',
    '!src/index.ts',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: './reports/coverage',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],

  moduleNameMapper: {
    '@src(.*)$': '<rootDir>/src$1',
    '@config': '<rootDir>/src/config/config',
    '@controllers(.*)$': '<rootDir>/src/controllers$1',
    '@middlewares(.*)$': '<rootDir>/src/middlewares$1',
    '@services(.*)$': '<rootDir>/src/services$1',
    '@utils(.*)$': '<rootDir>/src/utils$1',
  },

  reporters: ['default', 'jest-junit'],

  testEnvironment: 'node',

  testMatch: ['**/?(*.)test.ts'],

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
