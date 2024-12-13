import { getAllCombinations } from "./getAllCombinations";
describe("getAllCombinations", () => {
  it("gets all combinations of n elements from an array of k size", () => {
    let test = [1, 2, 3];
    expect(getAllCombinations(test, 2)).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });
});
