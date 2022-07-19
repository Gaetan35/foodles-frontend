export type Cart = {
  [productId: string]: { unitPrice: number; quantity: number };
};
