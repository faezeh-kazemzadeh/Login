import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { truncate } from "../../../utils/string";
import { productQuantity } from "../../../utils/helper";
import { fetchProducts } from "../../../redux/product/productsSlice";
import {
  addToCart,
  removeFromCart,
  increase,
  decrease,
} from "../../../redux/cart/cartSlice";
import { TbBasketPlus } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./productDetail.module.css";
export default function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const quantity = productQuantity(cart, params.id);
  const [product, setProduct] = useState(undefined);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [productImage, setProductImage] = useState(undefined);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);
  useEffect(() => {
    const foundProduct = products.find((product) => product._id === params.id);
    setProduct(foundProduct);
  }, [products]);
  useEffect(() => {
    if (product) {
      const discountAmount = (product.regularPrice * product.discount) / 100;
      const calculatedDiscountPrice = product.regularPrice - discountAmount;
      setDiscountPrice(calculatedDiscountPrice);
      setProductImage(`/images/${product.imageUrls[0].name}`);
    }
  }, [product]);

  return (
    product && (
      <div className={styles.productCard}>
        <div className={styles.productImageBox}>
          {product.imageUrls.length > 1 && (
            <div className={styles.images}>
              {product.imageUrls.map((image, imdex) => {
                return (
                  <img
                    key={imdex}
                    src={`/images/${image.name}`}
                    onClick={() => setProductImage(`/images/${image.name}`)}
                    alt={truncate(image.name)}
                    style={{ width: "50px", height: "50px" }}
                  />
                );
              })}
            </div>
          )}
          <div className={styles.thumbnail}>
            <img src={productImage} srcSet={productImage} alt={product.name} />
          </div>
        </div>
        <div className={styles.productContent}>
          <article>
            <h1 className={styles.productName}>{truncate(product.name, 25)}</h1>
            <p>{product.description}</p>

            {product.discount > 0 ? (
              <p className={styles.productDiscountedPrice}>
                <span>Discounted Price : </span>
                {discountPrice}{" "}
              </p>
            ) : (
              ""
            )}

            <p className={styles.price}>
              <span>Original Price :</span>{" "}
              <span className={styles.productPrice}>
                {product.regularPrice}
              </span>{" "}
              <span className={styles.productDiscount}>
                {product.discount > 0 && `-${product.discount}%`}
              </span>
            </p>
          </article>
          <div className="flex justify-between">
            <div className={styles.actions}>
              {quantity === 0 ? (
                <button
                  type="button"
                  className={styles.add}
                  onClick={() => dispatch(addToCart(product))}
                >
                  <TbBasketPlus />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => dispatch(increase(product))}
                >
                  +
                </button>
              )}
              {!!quantity && <span>{quantity}</span>}
              {quantity === 1 && (
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  <IoTrashOutline />
                </button>
              )}
              {quantity > 1 && (
                <button
                  type="button"
                  onClick={() => dispatch(decrease(product))}
                >
                  -
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center bg-slate-700 text-white px-6 rounded-md"
            >
              <IoIosArrowBack /> Back
            </button>
          </div>
        </div>
      </div>
    )
  );
}
