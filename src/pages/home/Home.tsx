import { useState } from "react";
import { useQuery } from "react-query";
import { apiRoutes } from "../../routes/apiRoutes";
import { Cart } from "../../types/cart";
import { Product } from "../../types/product";
import { sendFetchRequest } from "../../utils/sendFetchRequest";
import styles from "./Home.module.scss";
import { ProductCard } from "./productCard/ProductCard";
import { TopBar } from "./topBar/TopBar";

type ProductResponse = Product[];

export const Home = () => {
  const { data: products } = useQuery<ProductResponse, Error>("products", () =>
    sendFetchRequest(apiRoutes.fetchProducts)
  );

  const [cart, setCart] = useState<Cart>({});

  const modifyCart = (productId: string, unitPrice: number, amount: number) => {
    setCart((previousCart) => {
      const previousQuantity = previousCart[productId]?.quantity ?? 0;

      return {
        ...previousCart,
        [productId]: { unitPrice, quantity: previousQuantity + amount },
      };
    });
  };

  return (
    <div className={styles.homePageContainer}>
      <TopBar cart={cart} />
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Livraison</h1>

        <div className={styles.cardsContainer}>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              modifyCart={modifyCart}
              selectedQuantity={cart[product.id]?.quantity ?? 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
