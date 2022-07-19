import { Product } from "../../../types/product";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./ProductCard.module.scss";
import { ReactComponent as AddToCartIcon } from "../../../assets/icons/addToCartIcon.svg";

type ProductCardProps = Product;

export const ProductCard = ({
  description,
  price,
  imageUrl,
}: ProductCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.image} src={imageUrl} alt={description} />
      <div className={styles.cardBottom}>
        <h2 className={styles.description}>{description}</h2>
        <p className={styles.price}>{formatPrice(price)}</p>
        <div className={styles.buttonsContainer}>
          <button className={styles.addToCart}>
            <AddToCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
