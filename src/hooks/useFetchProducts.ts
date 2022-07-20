import { useQuery } from "react-query";
import { apiRoutes } from "../routes/apiRoutes";
import { Product } from "../types/product";
import { sendFetchRequest } from "../utils/sendFetchRequest";

type FetchProductsResponse = Product[];

export const useFetchProducts = () => {
  const {
    data: products,
    refetch: refetchProducts,
    isLoading: isFetchProductsLoading,
  } = useQuery<FetchProductsResponse, Error>("fetchProducts", () =>
    sendFetchRequest(apiRoutes.fetchProducts)
  );

  return { products, refetchProducts, isFetchProductsLoading };
};
