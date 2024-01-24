import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { truncate } from '../utils/string'
import { increase , decrease,removeFromCart } from '../redux/cart/cartSlice'
import { IoTrashOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import styles from './cart.module.css'
export default function Cart() {
  const dispatch =useDispatch()
  const cart= useSelector(state=>state.cart)
  console.log(cart)
  return (
    cart.itemsCounter === 0 ? (
      <p>loading...</p>
    ):(
      <div className={styles.cartContainer}>
        {
          cart.selectedItems.map(item=>(
            <div key={item._id} className={styles.card}>
              <div className={styles.imageBox}>
              <img src={`/images/${item.imageUrls[0].name}`} alt="" />
              </div>
              <div>
              <h3>{truncate(item.name,25)}</h3>
              <div className={styles.acthins}>
                <button type="button" onClick={()=>dispatch(increase(item))}>+</button>
                <span>{item.quantity}</span>
                {item.quantity === 1 ?(
                  <button type="button" onClick={()=>dispatch(removeFromCart(item))}><IoTrashOutline/></button>
                ):(
                  <button type="button" onClick={()=>dispatch(decrease(item))}>-</button>
                )}
              </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  )
}
