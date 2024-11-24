module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specify the parser for TypeScript
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // General
    'no-console': 'warn', // Warns on console.log usage
    'no-unused-vars': 'off', // Disable base rule as it's handled by TypeScript
    '@typescript-eslint/no-unused-vars': 'warn', // Warn on unused variables

    // TypeScript Specific
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Allows implicit return types
    '@typescript-eslint/no-explicit-any': 'warn', // Warn on usage of `any`

    // React Specific
    'react/prop-types': 'off', // Turn off prop types check (TypeScript does this)
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }], // Restrict jsx to .tsx files
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }], // JSX without curly braces for props and children

    // Styling and best practices
    'react/jsx-uses-react': 'off', // React 17 JSX Transform no longer needs this
    'react/react-in-jsx-scope': 'off', // React 17 JSX Transform no longer needs this
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // External packages (e.g., react, lodash)
          ['^react', '^@?\\w'],
          // Relative imports
          ['^\\./', '^\\.\\./'],
          // Style imports
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn', // Sort exports

    // Unused imports
    'unused-imports/no-unused-imports': 'warn', // Warn on unused imports
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // TypeScript Formatting rules
    '@typescript-eslint/ban-ts-comment': 'warn', // Warn on // @ts- comments
    '@typescript-eslint/no-non-null-assertion': 'warn', // Warn on non-null assertions (!)
    '@typescript-eslint/explicit-function-return-type': 'warn', // Warn if function doesn't have an explicit return type
    '@typescript-eslint/no-namespace': 'warn', // Warn on namespaces
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the react version
    },
  },
  globals: {
    React: 'writable',
    JSX: 'writable',
  },
};
