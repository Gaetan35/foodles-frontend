import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  test.each`
    price    | expectedResult
    ${0}     | ${"0,00 €"}
    ${2.1}   | ${"2,10 €"}
    ${98.92} | ${"98,92 €"}
    ${1.149} | ${"1,15 €"}
  `(
    "formats Price correctly when price = $price",
    ({ price, expectedResult }: { price: number; expectedResult: string }) => {
      expect(formatPrice(price)).toEqual(expectedResult);
    }
  );
});
