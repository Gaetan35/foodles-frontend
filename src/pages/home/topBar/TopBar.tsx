import { Cart } from "../../../types/cart";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./TopBar.module.scss";
import { ReactComponent as CartIcon } from "../../../assets/icons/cartIcon.svg";

type TopBarProps = {
  cart: Cart;
};

const computeTotalCartPrice = (cart: Cart) =>
  Object.values(cart).reduce(
    (previousValue, { unitPrice, quantity }) =>
      previousValue + unitPrice * quantity,
    0
  );

export const TopBar = ({ cart }: TopBarProps) => {
  return (
    <div className={styles.topBar}>
      <div>Select client</div>
      <button className={styles.cartRecap}>
        <CartIcon />
        <p className={styles.totalCartPrice}>
          {formatPrice(computeTotalCartPrice(cart))}
        </p>
      </button>
    </div>
  );
};
