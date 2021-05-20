module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      classes: true,
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': ['warn'],
    'react/require-default-props': ['warn'],
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'no-shadow': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-curly-brace-presence': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
    'no-use-before-define': ['warn'],
    'import/prefer-default-export': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 1,
    'no-multiple-empty-lines': [1, { max: 1 }],
    'react/state-in-constructor': 0,
    'linebreak-style': 0,
    'react/sort-comp': 1,
    'max-len': ['error', 150],
    camelcase: ['warn'],
    'arrow-parens': 'off', // Несовместимо с prettier
    'object-curly-newline': 'off', // Несовместимо с prettier
    'no-mixed-operators': 'off', // Несовместимо с prettier
    'arrow-body-style': 'off', // Это - не наш стиль?
    'function-paren-newline': 'off', // Несовместимо с prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Несовместимо с prettier
    'no-console': 'error', // airbnb использует предупреждение
    'no-alert': 'error', // airbnb использует предупреждение
    'react/jsx-curly-newline': 'off',
    'no-param-reassign': 'off', // Это - не наш стиль?
    radix: 'off', // parseInt, parseFloat и radix выключены. Мне это не нравится.
    semi: 'off',
    // 'react/jsx-props-no-spreading': 'off',
    // 'react/require-default-props': 'off', // airbnb использует уведомление об ошибке
    // 'react/forbid-prop-types': 'off', // airbnb использует уведомление об ошибке
    'react/no-access-state-in-setstate': 'off',
    'prefer-destructuring': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-did-update-set-state': 'off',
    'no-unused-vars': [1, { vars: 'all', args: 'none' }],
    // 'react/no-unused-prop-types': 'off', // Это всё ещё работает нестабильно
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ], // для ошибки вложенных свойств htmlFor элементов label
    'class-methods-use-this': ['warn'],
    // 'prettier/prettier': ['error'],
    'template-curly-spacing': 'off', // временное отключение, баг линтера
    indent: 'off', // временное отключение, баг линтера
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        browser: true,
        es6: true,
        node: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['react', '@typescript-eslint'],
      rules: {
        // временное отключение indent, баг линтера
        // indent: [
        //   'error',
        //   2,
        //   {
        //     SwitchCase: 1,
        //   },
        // ],
        // 'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'react/jsx-filename-extension': 0,
        'react/prop-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        // '@typescript-eslint/explicit-function-return-type': 0,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
