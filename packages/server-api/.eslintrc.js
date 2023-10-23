module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'warn',
    'linebreak-style': 0,
    'operator-linebreak': 'off',
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 8,
      },
    ],
  },
};
