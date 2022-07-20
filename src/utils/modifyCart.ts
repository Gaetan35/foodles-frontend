import { Cart } from "../types/cart";

type ModifyCartParams = {
  productId: string;
  unitPrice: number;
  amount: number;
  setCart: (param: (previousCart: Cart) => Cart) => void;
};

export const modifyCart = ({
  productId,
  unitPrice,
  amount,
  setCart,
}: ModifyCartParams) => {
  setCart((previousCart) => {
    const previousQuantity = previousCart[productId]?.quantity ?? 0;

    return {
      ...previousCart,
      [productId]: { unitPrice, quantity: previousQuantity + amount },
    };
  });
};
