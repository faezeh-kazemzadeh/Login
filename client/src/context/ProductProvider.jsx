import React, { createContext, useContext, useEffect, useState } from "react";

export const ProductContext = createContext();

 const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
     try {
      await fetch("/api/product/getAll")
      .then(response=>response.json())
      .then(data=> setProducts(data))
      // const res = await fetch("/api/product/getAll");
      // const data = await res.json();
      //  setProducts(data);
     } catch (error) {
      console.log(error)
     }
    };
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProducts=()=>{
  const products=useContext(ProductContext)
  return products;
}
