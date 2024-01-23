import React, { useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { fetchProducts } from "../redux/product/productsSlice";
import { ProductCard } from "../components";
export default function Products() {
    const dispatch = useDispatch()
    const {products} = useSelector(state=>state.products)
    useEffect(()=>{
        if (products.length===0){
            dispatch(fetchProducts())
            }

    },[products])
  return (
    <div>
      <h1>Products</h1>
      {products ? (
        <div className="flex gap-4 flex-wrap" >
        {/* map through the products array and create a div for each product */}
        {products.map((product)=>(
            <div key={product._id} style={{width:"300px"}}>
                <ProductCard  product={product
        }/>
            </div>
        ))}

      </div>
      ) :(<p>there is no item to show</p>)}
    </div>
  );
}
