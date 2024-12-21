"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    prettierPath: require.resolve('prettier-2'),
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.(ts)$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.json",
            },
        ],
    },
};
exports.default = config;
