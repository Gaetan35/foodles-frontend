import { Cart } from "../../../types/cart";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./TopBar.module.scss";
import { ReactComponent as CartIcon } from "../../../assets/icons/cartIcon.svg";

import { Client } from "../../../types/client";
import { ClientSelect } from "./clientSelect/ClientSelect";

type TopBarProps = {
  cart: Cart;
  selectedClient?: Client;
  setSelectedClient: (newClient: Client) => void;
  clients: Client[];
};

const computeTotalCartPrice = (cart: Cart) =>
  Object.values(cart).reduce(
    (previousValue, { unitPrice, quantity }) =>
      previousValue + unitPrice * quantity,
    0
  );

export const TopBar = ({
  cart,
  selectedClient,
  setSelectedClient,
  clients,
}: TopBarProps) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.flexRow}>
        <ClientSelect
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          clients={clients}
        />
        {selectedClient !== undefined && (
          <p className={styles.selectedClientCredit}>
            Credit : {formatPrice(selectedClient.credit)}
          </p>
        )}
      </div>
      <button className={styles.cartRecap}>
        <CartIcon />
        <p className={styles.totalCartPrice}>
          {formatPrice(computeTotalCartPrice(cart))}
        </p>
      </button>
    </div>
  );
};
