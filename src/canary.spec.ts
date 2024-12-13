import { canary } from "./canary";

test("Canary test", () => {
  expect(canary("World")).toBe("Hello World!");
});
