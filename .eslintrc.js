module.exports = {
  "env": {
    "browser": true,
    "es2020": true,
    "es6": true,
    "node": true,
  },
  parser: 'babel-eslint',  // Specifies the ESLint parser
  // extends属性表示启用一系列核心规则，若有plugins属性表示同时启用插件的核心规则
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    // 'react-hooks/rules-of-hooks': 'error',
    // "semi": ['error', 'never'],
    // 'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
  }
};
