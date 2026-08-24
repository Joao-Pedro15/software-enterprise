import shared = require('./jest.shared');

const config = shared.default;

export default {
  ...config,
  testMatch: ['<rootDir>/src/__test__/e2e/*.spec.ts'],
};
