module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: [
    'react',
    'react-native',
    'jsx-a11y',
    'import'
  ],
  settings: {
    'import/resolver': 'reactnative'
  },
  env: {
    jest: true
  },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }],
    "react/prop-types": ["error", { "ignore": ["navigation", "t", "i18n"] }],
    'react/jsx-no-bind': 0,
    'react/jsx-wrap-multilines': 0,
    'react/require-default-props': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'import/prefer-default-export': 0,
    'no-unused-vars': [2, { 'argsIgnorePattern': '^_' }],
    'max-len': [2, 100],
    'global-require': 0,
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 0,
      maxBOF: 0,
    }],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-useless-constructor': 0,
    'object-curly-newline': 0,
    'newline-before-return': 'error'
  },
  globals: {
    fetch: false,
    shallow: true,
    mount: true,
    render: true,
    withNamespaces: true,
    navigator: true,
    __DEV__: true,
    requestAnimationFrame: true
  }
};
