import { useMutation } from "react-query";
import { apiRoutes } from "../routes/apiRoutes";
import { Cart } from "../types/cart";
import { NetworkError } from "../types/NetworkError";
import { sendPostRequest } from "../utils/sendPostRequest";

type UseSendOrderParams = {
  clientId?: string;
  onSuccess: () => void;
  onError: (error: NetworkError) => void;
};

export const useSendOrder = ({
  clientId,
  onSuccess,
  onError,
}: UseSendOrderParams) => {
  const { mutate: sendOrder, isLoading: isSendOrderLoading } = useMutation(
    (cartToOrder: Cart) =>
      sendPostRequest(apiRoutes.sendOrder, {
        clientId,
        orders: Object.entries(cartToOrder).map(
          ([productId, { quantity }]) => ({ productId, quantity })
        ),
      }),
    {
      onSuccess,
      onError,
    }
  );

  return { sendOrder, isSendOrderLoading };
};
