import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toast";
import { apiRoutes } from "../../routes/apiRoutes";
import { NetworkError } from "../../types/NetworkError";
import { Cart } from "../../types/cart";
import { Client } from "../../types/client";
import { Product } from "../../types/product";
import { sendFetchRequest } from "../../utils/sendFetchRequest";
import { sendPostRequest } from "../../utils/sendPostRequest";
import styles from "./Home.module.scss";
import { ProductCard } from "./productCard/ProductCard";
import { TopBar } from "./topBar/TopBar";

type FetchProductsResponse = Product[];

type FetchClientsResponse = Client[];

export const Home = () => {
  const {
    data: products,
    refetch: refetchProducts,
    isLoading: isFetchProductsLoading,
  } = useQuery<FetchProductsResponse, Error>("fetchProducts", () =>
    sendFetchRequest(apiRoutes.fetchProducts)
  );

  const { data: clients, refetch: refetchClients } = useQuery<
    FetchClientsResponse,
    Error
  >("fetchClients", () => sendFetchRequest(apiRoutes.fetchClients));

  const [cart, setCart] = useState<Cart>({});
  const [selectedClientId, setSelectedClientId] = useState<string>();

  const { mutate: sendOrder, isLoading: isSendOrderLoading } = useMutation(
    (cartToOrder: Cart) =>
      sendPostRequest(apiRoutes.sendOrder, {
        clientId: selectedClientId,
        orders: Object.entries(cartToOrder).map(
          ([productId, { quantity }]) => ({ productId, quantity })
        ),
      }),
    {
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
    }
  );

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
      <TopBar
        cart={cart}
        selectedClientId={selectedClientId}
        setSelectedClientId={setSelectedClientId}
        clients={clients ?? []}
        sendOrder={sendOrder}
        isSendOrderLoading={isSendOrderLoading}
      />
      <div className={styles.pageContainer}>
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
                modifyCart={modifyCart}
                selectedQuantity={cart[product.id]?.quantity ?? 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
