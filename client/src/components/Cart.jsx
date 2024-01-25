import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { truncate } from "../utils/string";
import { increase, decrease, removeFromCart } from "../redux/cart/cartSlice";
import { useThemeContext } from "../context/ThemeProvider";
import { IoTrashOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import styles from "./cart.module.css";
export default function Cart() {
  const {handleClick}=useThemeContext()

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  return (
    <div className={styles.cartContainer}>
      <div>
        <button type="button" onClick={() => handleClick("cart")}><IoClose /></button>
      </div>
      {cart.itemsCounter === 0 ? (
        <p>loading...</p>
      ) : (
        <>
        {cart.selectedItems.map((item) => (
          <div key={item._id} className={styles.card}>
            <div className={styles.imageBox}>
              <img src={`/images/${item.imageUrls[0].name}`} alt="" />
            </div>
            <div className={styles.content}>
              <h3>{truncate(item.name, 15)}</h3>
              <div className={styles.actions}>
                <button type="button" onClick={() => dispatch(increase(item))}>
                  +
                </button>
                <span>{item.quantity}</span>
                {item.quantity === 1 ? (
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    <IoTrashOutline />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => dispatch(decrease(item))}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div>
          <p>total items : {cart.itemsCounter}</p>
          <p>totalPrice : ${cart.total}</p>
          <button type="button">CheckOut</button>
        </div>
        </>
      )}
    </div>
  );
}
