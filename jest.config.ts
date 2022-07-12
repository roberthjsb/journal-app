export default {
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.ts']
  }