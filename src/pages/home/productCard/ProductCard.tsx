import classNames from "classnames";
import { Product } from "../../../types/product";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./ProductCard.module.scss";
import { ReactComponent as AddToCartIcon } from "../../../assets/icons/addToCartIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plusIcon.svg";
import { ReactComponent as MinusIcon } from "../../../assets/icons/minusIcon.svg";

type ProductCardProps = Product & {
  selectedQuantity: number;
  modifyCart: (params: {
    productId: string;
    unitPrice: number;
    amount: number;
  }) => void;
};

export const ProductCard = ({
  id,
  description,
  price,
  imageUrl,
  selectedQuantity,
  stock,
  modifyCart,
}: ProductCardProps) => {
  const isMaxQuantity = selectedQuantity === stock;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        {selectedQuantity !== 0 && (
          <div className={styles.imageOverlay}>{selectedQuantity}</div>
        )}

        <img className={styles.image} src={imageUrl} alt={description} />
      </div>

      <div className={styles.cardBottom}>
        <h2 className={styles.description}>{description}</h2>
        <p className={styles.price}>{formatPrice(price)}</p>
        <div className={styles.buttonsContainer}>
          {selectedQuantity === 0 ? (
            <button
              className={classNames(styles.addToCart, styles.productCartButton)}
              onClick={() =>
                modifyCart({ productId: id, unitPrice: price, amount: 1 })
              }
            >
              <AddToCartIcon />
            </button>
          ) : (
            <>
              <button
                className={classNames(
                  styles.removeFromCart,
                  styles.productCartButton
                )}
                onClick={() =>
                  modifyCart({ productId: id, unitPrice: price, amount: -1 })
                }
              >
                <MinusIcon />
              </button>
              <button
                className={classNames(
                  styles.addToCart,
                  styles.productCartButton,
                  { [styles.disabledButton]: isMaxQuantity }
                )}
                disabled={isMaxQuantity}
                onClick={() =>
                  modifyCart({ productId: id, unitPrice: price, amount: 1 })
                }
                title={isMaxQuantity ? "Quantité maximale atteinte" : ""}
              >
                <PlusIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
