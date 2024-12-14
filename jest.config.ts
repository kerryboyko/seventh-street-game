import type { Config } from "jest";

const config: Config = {
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

export default config;
