export function getAllCombinations<T>(array: T[], pickN: number): T[][] {
  if (array.length <= pickN) {
    return [array];
  }

  function combinations(arr: T[], size: number): T[][] {
    if (size === 0) return [[]];
    if (arr.length < size) return [];

    const [first, ...rest] = arr;

    // Combinations that include the first element
    const withFirst = combinations(rest, size - 1).map((comb) => [
      first,
      ...comb,
    ]);

    // Combinations that exclude the first element
    const withoutFirst = combinations(rest, size);

    return withFirst.concat(withoutFirst);
  }

  return combinations(array, pickN);
}
