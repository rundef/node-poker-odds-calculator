module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-lodash",
        "eslint-plugin-security",
        "eslint-plugin-react",
        "eslint-plugin-jest",
        "eslint-plugin-jsdoc",
        "eslint-plugin-import",
        "eslint-plugin-no-null",
        "eslint-plugin-prefer-arrow",
        "jsx-a11y",
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "root": true,
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "array"
            }
        ],
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            {
                "allowExpressions": false,
                "allowTypedFunctionExpressions": false,
                "allowHigherOrderFunctions": false,
                "allowDirectConstAssertionInArrowFunctions": true,
                "allowConciseArrowFunctionExpressionsStartingWithVoid": true
            }
        ],
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit"
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": [
            "error",
            {
                "allowArgumentsExplicitlyTypedAsAny": true,
                "allowDirectConstAssertionInArrowFunctions": true,
                "allowHigherOrderFunctions": false,
                "allowTypedFunctionExpressions": false
            }
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                "CallExpression": {
                    "arguments": "first"
                },
                "FunctionDeclaration": {
                    "parameters": "first"
                },
                "FunctionExpression": {
                    "parameters": "first"
                }
            }
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "variable",
                "format": [
                    "camelCase",
                    "UPPER_CASE"
                ],
                "leadingUnderscore": "forbid",
                "trailingUnderscore": "forbid"
            }
        ],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-for-in-array": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-parameter-properties": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                "hoist": "all"
            }
        ],
        "@typescript-eslint/no-unnecessary-qualifier": "off",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/quotes": [
            "error",
            "single"
        ],
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/typedef": [
            "error",
            {
                "parameter": true,
                "arrowParameter": true,
                "propertyDeclaration": true,
                "variableDeclaration": true,
                "memberVariableDeclaration": true
            }
        ],
        "@typescript-eslint/unified-signatures": "error",
        "arrow-parens": [
            "off",
            "always"
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "comma-dangle": "error",
        "complexity": "off",
        "curly": "error",
        "default-case": "error",
        "dot-notation": "off",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-denylist": "error",
        "id-match": "error",
        "import/no-default-export": "error",
        "import/order": [
            "error",
            {
                "alphabetize": {
                    "caseInsensitive": true,
                    "order": "asc"
                },
                "newlines-between": "ignore",
                "groups": [
                    [
                        "builtin",
                        "external",
                        "internal",
                        "unknown",
                        "object",
                        "type"
                    ],
                    "parent",
                    [
                        "sibling",
                        "index"
                    ]
                ],
                "distinctGroup": false,
                "pathGroupsExcludedImportTypes": [],
                "pathGroups": [
                    {
                        "pattern": "./",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "sibling",
                        "position": "before"
                    },
                    {
                        "pattern": ".",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "sibling",
                        "position": "before"
                    },
                    {
                        "pattern": "..",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "parent",
                        "position": "before"
                    },
                    {
                        "pattern": "../",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "parent",
                        "position": "before"
                    }
                ]
            }
        ],
        "indent": "off",
        "jest/no-focused-tests": "error",
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "error",
        "jsdoc/newline-after-description": "error",
        "jsx-a11y/alt-text": "error",
        "jsx-a11y/anchor-is-valid": "error",
        "jsx-a11y/aria-props": "error",
        "jsx-a11y/aria-proptypes": "error",
        "jsx-a11y/aria-role": "error",
        "jsx-a11y/lang": "error",
        "jsx-a11y/no-static-element-interactions": "error",
        "jsx-a11y/role-has-required-aria-props": "error",
        "jsx-a11y/role-supports-aria-props": "error",
        "jsx-a11y/tabindex-no-positive": "error",
        "linebreak-style": "error",
        "lodash/chaining": [
            "off",
            "never"
        ],
        "max-classes-per-file": "off",
        "max-len": [
            "error",
            {
                "code": 140
            }
        ],
        "max-lines": "error",
        "max-statements": "off",
        "new-parens": "error",
        "no-array-constructor": "off",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": [
            "error",
            {
                "allow": [
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context",
                    "createTask"
                ]
            }
        ],
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-empty": "error",
        "no-empty-function": "off",
        "no-eval": "error",
        "no-extra-semi": "error",
        "no-fallthrough": "off",
        "no-invalid-regexp": "error",
        "no-invalid-this": "error",
        "no-magic-numbers": "off",
        "no-multi-str": "error",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-null/no-null": "off",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-restricted-imports": "off",
        "no-restricted-syntax": [
            "error",
            {
                "message": "Forbidden call to document.cookie",
                "selector": "MemberExpression[object.name=\"document\"][property.name=\"cookie\"]"
            }
        ],
        "no-shadow": "off",
        "no-sparse-arrays": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "off",
        "no-unused-labels": "error",
        "no-use-before-define": "off",
        "no-var": "error",
        "no-void": "off",
        "no-warning-comments": [
            "error",
            {
                "location": "anywhere",
                "terms": [
                    "BUG",
                    "HACK",
                    "FIXME",
                    "LATER",
                    "LATER2",
                    "TODO"
                ]
            }
        ],
        "no-with": "error",
        "object-shorthand": "off",
        "one-var": [
            "error",
            "never"
        ],
        "padded-blocks": [
            "off",
            {
                "blocks": "never"
            },
            {
                "allowSingleLineBlocks": true
            }
        ],
        "prefer-arrow/prefer-arrow-functions": [
            "off",
            {}
        ],
        "prefer-const": "error",
        "quote-props": [
            "error",
            "as-needed"
        ],
        "quotes": "off",
        "radix": "error",
        "react/jsx-curly-spacing": [
            "error",
            {}
        ],
        "react/no-danger": "error",
        "security/detect-non-literal-require": "error",
        "security/detect-possible-timing-attacks": "error",
        "semi": "off",
        "space-before-function-paren": "off",
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "chai-prefer-contains-to-index-of": true,
                    "export-name": true,
                    "function-name": true,
                    "import-name": true,
                    "import-spacing": true,
                    "insecure-random": true,
                    "jquery-deferred-must-complete": true,
                    "missing-jsdoc": true,
                    "mocha-no-side-effect-code": true,
                    "mocha-unneeded-done": true,
                    "no-backbone-get-set-outside-model": true,
                    "no-disable-auto-sanitization": true,
                    "no-duplicate-case": true,
                    "no-function-constructor-with-string-args": true,
                    "no-http-string": [
                        true,
                        "http://www.example.com/?.*",
                        "http://www.examples.com/?.*"
                    ],
                    "no-increment-decrement": true,
                    "no-inner-html": true,
                    "no-jquery-raw-elements": true,
                    "no-reserved-keywords": true,
                    "no-single-line-block-comment": true,
                    "no-string-based-set-immediate": true,
                    "no-string-based-set-interval": true,
                    "no-string-based-set-timeout": true,
                    "no-typeof-undefined": true,
                    "no-unnecessary-bind": true,
                    "no-unnecessary-local-variable": true,
                    "no-unnecessary-override": true,
                    "no-unsupported-browser-code": true,
                    "no-unused-new": true,
                    "no-var-self": true,
                    "prefer-method-signature": true,
                    "prefer-type-cast": true,
                    "promise-must-complete": true,
                    "react-a11y-meta": true,
                    "react-a11y-titles": true,
                    "react-anchor-blank-noopener": true,
                    "react-iframe-missing-sandbox": true,
                    "react-this-binding-issue": true,
                    "use-named-parameter": true,
                    "valid-typeof": true,
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-separator",
                        "check-type"
                    ]
                }
            }
        ]
    }
};
