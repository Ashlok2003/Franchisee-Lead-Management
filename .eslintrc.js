export default {
    overrides: [
        {
            files: ['client/**/*'],
            extends: ['eslint:recommended', 'plugin:react/recommended'],
            env: {
                browser: true,
                es2021: true,
            },
            parserOptions: {
                ecmaVersion: 12,
                sourceType: 'module',
            },
            rules: {
                // Frontend specific rules can go here
            },
        },
        {
            files: ['src/**/*'],
            extends: ['eslint:recommended', 'plugin:node/recommended'],
            env: {
                node: true,
                es2021: true,
            },
            parserOptions: {
                ecmaVersion: 12,
                sourceType: 'module',
            },
            rules: {
                // Backend specific rules can go here
            },
        },
    ],
};
