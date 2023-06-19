export default {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.ts', 'dotenv/config'],
  transformIgnorePatterns: [],
  resolver: '<rootDir>/jest.resolver.js',
  collectCoverage: false,
  collectCoverageFrom: ["./src/**","!./src/__test__/**/*"]
}