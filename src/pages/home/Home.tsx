import { useQuery } from "react-query";
import { apiRoutes } from "../../routes/apiRoutes";
import { Product } from "../../types/product";
import { sendFetchRequest } from "../../utils/sendFetchRequest";
import styles from "./Home.module.scss";
import { ProductCard } from "./productCard/ProductCard";

type ProductResponse = Product[];

export const Home = () => {
  const { data: products } = useQuery<ProductResponse, Error>("products", () =>
    sendFetchRequest(apiRoutes.fetchProducts)
  );

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.topbar}>Topbar</div>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Livraison</h1>

        <div className={styles.cardsContainer}>
          {products?.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};
