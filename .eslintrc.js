module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
        requireConfigFile: false,
    },
    rules: {
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

