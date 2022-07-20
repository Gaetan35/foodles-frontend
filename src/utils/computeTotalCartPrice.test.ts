import { Cart } from "../types/cart";
import { computeTotalCartPrice } from "./computeTotalCartPrice";

describe("computeTotalCartPrice", () => {
  it.each`
    cart                                                                         | expectedResult
    ${{}}                                                                        | ${0}
    ${{ id: { unitPrice: 1, quantity: 5 } }}                                     | ${5}
    ${{ id: { unitPrice: 1, quantity: 5 }, id2: { unitPrice: 2, quantity: 1 } }} | ${7}
  `(
    "formats Price correctly when price = $price",
    ({ cart, expectedResult }: { cart: Cart; expectedResult: number }) => {
      expect(computeTotalCartPrice(cart)).toEqual(expectedResult);
    }
  );
});
