import { Cart } from "../types/cart";

export const computeTotalCartPrice = (cart: Cart) =>
  Object.values(cart).reduce(
    (previousValue, { unitPrice, quantity }) =>
      previousValue + unitPrice * quantity,
    0
  );
