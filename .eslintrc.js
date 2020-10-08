module.exports = {
  root: true,
  // extends: '@react-native-community',
  // parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'only-warn'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'object-curly-newline': 'off',
    'react/jsx-closing-bracket-location': [
      1,
      {selfClosing: 'line-aligned', nonEmpty: 'after-props'},
    ],
  },
};
