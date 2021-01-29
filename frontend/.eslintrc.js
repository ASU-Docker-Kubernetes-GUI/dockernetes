module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        react: {
           version: "detect"
        }
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 0,
    }
};