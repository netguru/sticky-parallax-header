module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'no-var': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'no-unused-vars': 'error',
    'newline-before-return': 'error',
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
  },
};
