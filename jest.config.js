module.exports = {
    preset: 'jest-expo',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|expo-modules-core|expo(nent)?|@expo(nent)?|@react-navigation|@testing-library)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};