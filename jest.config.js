module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.[t|j]sx?$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue3-jest',
        '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
    },
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
