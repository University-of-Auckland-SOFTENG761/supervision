/* eslint-disable */
export default {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/frontend',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@components(.*)$': '<rootDir>/src/app/components$1',
    '^@shared(.*)$': '<rootDir>/src/app/shared$1',
    '^@pages(.*)$': '<rootDir>/src/app/pages$1',
  },
  setupFiles: ['<rootDir>/setupTests.ts'],
};
