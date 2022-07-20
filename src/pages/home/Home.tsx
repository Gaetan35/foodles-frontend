import { useState } from "react";
import { toast } from "react-toast";
import { NetworkError } from "../../types/NetworkError";
import { Cart } from "../../types/cart";
import styles from "./Home.module.scss";
import { ProductCard } from "./productCard/ProductCard";
import { TopBar } from "./topBar/TopBar";
import { modifyCart } from "../../utils/modifyCart";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useFetchClients } from "../../hooks/useFetchClients";
import { useSendOrder } from "../../hooks/useSendOrder";

export const Home = () => {
  const { products, refetchProducts, isFetchProductsLoading } =
    useFetchProducts();

  const { clients, refetchClients } = useFetchClients();

  const [cart, setCart] = useState<Cart>({});
  const [selectedClientId, setSelectedClientId] = useState<string>();

  const { sendOrder, isSendOrderLoading } = useSendOrder({
    clientId: selectedClientId,
    onSuccess: () => {
      refetchClients();
      refetchProducts();
      setCart({});
      toast.success("Votre commande a bien été envoyée");
    },
    onError: (error: NetworkError) => {
      if (error.statusCode === 400) {
        refetchProducts();
        setCart({});
        toast.error("Les produits demandés ne sont plus disponibles");
      } else {
        toast.error("Une erreur s'est produite");
      }
    },
  });

  return (
    <div className={styles.homePageContainer}>
      <TopBar
        cart={cart}
        selectedClientId={selectedClientId}
        setSelectedClientId={setSelectedClientId}
        clients={clients ?? []}
        sendOrder={sendOrder}
        isSendOrderLoading={isSendOrderLoading}
      />
      <main className={styles.pageContainer}>
        <h1 className={styles.title}>Livraison</h1>

        {isFetchProductsLoading ? (
          <p className={styles.productsInfoMessage}>Chargement en cours ...</p>
        ) : products?.length === 0 ? (
          <p className={styles.productsInfoMessage}>
            Aucun produit n'est disponible
          </p>
        ) : (
          <div className={styles.cardsContainer}>
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                modifyCart={(params) => modifyCart({ ...params, setCart })}
                selectedQuantity={cart[product.id]?.quantity ?? 0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
