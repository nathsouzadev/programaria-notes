import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jsdom',
  watchman: false,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/tests/**/*.spec.ts', '<rootDir>/tests/**/*.spec.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@programaria/ui/tokens.css$': '<rootDir>/../../packages/ui/src/tokens.css',
    '^@programaria/ui/(.*)$': '<rootDir>/../../packages/ui/src/$1',
  },
};

export default createJestConfig(config);
