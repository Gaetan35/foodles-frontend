import classNames from "classnames";
import { Cart } from "../../../types/cart";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./TopBar.module.scss";
import { ReactComponent as CartIcon } from "../../../assets/icons/cartIcon.svg";

import { Client } from "../../../types/client";
import { ClientSelect } from "./clientSelect/ClientSelect";
import { computeTotalCartPrice } from "../../../utils/computeTotalCartPrice";

type TopBarProps = {
  cart: Cart;
  selectedClientId?: string;
  setSelectedClientId: (newClientId: string) => void;
  clients: Client[];
  sendOrder: (cart: Cart) => void;
  isSendOrderLoading: boolean;
};

export const TopBar = ({
  cart,
  selectedClientId,
  setSelectedClientId,
  clients,
  sendOrder,
  isSendOrderLoading,
}: TopBarProps) => {
  const totalCartPrice = computeTotalCartPrice(cart);
  const isOrderDisabled =
    selectedClientId === undefined || totalCartPrice === 0;

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId
  );

  return (
    <header className={styles.topBar}>
      <div className={styles.flexRow}>
        <ClientSelect
          selectedClient={selectedClient}
          setSelectedClientId={setSelectedClientId}
          clients={clients}
        />
        {selectedClientId !== undefined && (
          <p className={styles.selectedClientCredit}>
            Credit : {formatPrice(selectedClient?.credit ?? 0)}
          </p>
        )}
      </div>
      <button
        onClick={() => sendOrder(cart)}
        className={classNames(styles.cartRecap, {
          [styles.disabledOrderButton]: isOrderDisabled && !isSendOrderLoading,
          [styles.loadingOrderButton]: isSendOrderLoading,
        })}
        disabled={isOrderDisabled || isSendOrderLoading}
        title={
          isOrderDisabled
            ? "Veuillez sélectionner un client et au moins un produit"
            : ""
        }
      >
        <CartIcon />
        <p className={styles.totalCartPrice}>{formatPrice(totalCartPrice)}</p>
      </button>
    </header>
  );
};
