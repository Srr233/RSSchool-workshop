module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": ["error", "single"],
        "no-param-reassign": [
            "error",
            {
                "props": false
            }
        ],
        "no-plusplus": [
            "error",
            {
                "allowForLoopAfterthoughts": true
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "always",
                "json": "always"
            }
        ]
    }
};
