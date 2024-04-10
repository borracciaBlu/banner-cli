import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {sourceType: "commonjs"}
    },
    {
        languageOptions: {
            globals: globals.node
        }
    },
    pluginJs.configs.recommended,
    {
        rules: {
            "linebreak-style": ["error", "unix"],
            quotes: ["error", "single"],
            semi: ["error", "always"],
            "no-unused-vars": 0,
        }
    }
];
