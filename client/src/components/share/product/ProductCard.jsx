import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbBasketPlus } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import styles from "./product.module.css";
import { truncate } from "../../../utils/string";
import {
  addToCart,
  removeFromCart,
  increase,
  decrease,
} from "../../../redux/cart/cartSlice";
import { productQuantity } from "../../../utils/helper";
import { useSelector, useDispatch } from "react-redux";
export default function ProductCard({ product }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [discountPrice, setDiscountPrice] = useState(0);
  const quantity = productQuantity(cart, product._id);
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
      <div className={styles.transparentDiv}>
        <div className={styles.actions}>
          <Link to={`/product/${product._id}`}>
            <TbListDetails />
          </Link>
          <div className={styles.buttons}>
            {quantity === 1 && (
              <button
                type="button"
                onClick={() => dispatch(removeFromCart(product))}
              >
                <IoTrashOutline />
              </button>
            )}
            {quantity > 1 && (
              <button type="button" onClick={() => dispatch(decrease(product))}>
                -
              </button>
            )}
            {!!quantity && <span>{quantity}</span>}
            {quantity === 0 ? (
              <button
                type="button"
                className={styles.add}
                onClick={() => dispatch(addToCart(product))}
              >
                <TbBasketPlus />
              </button>
            ) : (
              <button type="button" onClick={() => dispatch(increase(product))}>
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
