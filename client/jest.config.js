// Base reference:
// https://basarat.gitbooks.io/typescript/docs/testing/jest.html

// Clue on how to test js and ts files in same project:
// https://stackoverflow.com/questions/45786951/can-not-run-unit-tests-through-jest-framework-because-of-syntaxerror-unexpected

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testRegex: 'test.(ts|tsx|js|jsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
