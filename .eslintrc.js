module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    plugins: ['ghost'],
    extends: [
        'plugin:ghost/node',
        'plugin:ghost/ember',
    ],
    rules: {
        'ghost/sort-imports-es6-autofix/sort-imports-es6': 'off',
        'ghost/ember/use-ember-get-and-set': 'off',
        'no-console': 'off',
        'no-inner-declarations': 'off',
        'valid-jsdoc': 'off',
        'require-jsdoc': 'off',
        'consistent-return': ['error'],
        'arrow-body-style': [
            'error',
            'as-needed',
            { requireReturnForObjectLiteral: true },
        ],
        'jsx-quotes': ['error', 'prefer-double'],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'ignore',
            },
        ],
        indent: ['error', 4, {
            ignoredNodes: ['TemplateLiteral'],
        }],
    },
};

