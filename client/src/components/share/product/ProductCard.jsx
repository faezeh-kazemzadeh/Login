import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
  import { TbBasketPlus } from "react-icons/tb";
import styles from "./product.module.css";
import { truncate } from "../../../utils/string";
export default function ProductCard({ product }) {
  const [discountPrice, setDiscountPrice] = useState(0);
  useEffect(() => {
    const discountAmount = (product.regularPrice * product.discount) / 100;
    const calculatedDiscountPrice = product.regularPrice - discountAmount;
    setDiscountPrice(calculatedDiscountPrice);
  }, [product]);
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageBox}>
        <img
          src={`/images/${product.imageUrls[0].name}`}
          srcSet={`/images/${product.imageUrls[0].name}`}
          alt={product.name}
        />
      </div>
      <div className={styles.productContent}>
        <header className={styles.productName}>
          {truncate(product.name, 25)}
        </header>
        <p className={styles.productDiscountedPrice}>
          {product.discount > 0 ? discountPrice : product.regularPrice}
        </p>
        <p className={styles.price}>
          <span>Originally:</span>{" "}
          <span className={styles.productPrice}>{product.regularPrice}</span>{" "}
          <span className={styles.productDiscount}>
            {product.discount > 0 && `-${product.discount}%`}
          </span>
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.add}>
          <TbBasketPlus />
        </button>
        <Link to={`/product/${product._id}`}>
          Details
        </Link>
      </div>
    </div>
  );
}
