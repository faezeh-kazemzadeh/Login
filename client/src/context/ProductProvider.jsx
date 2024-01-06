import React, { createContext, useContext, useEffect, useState } from "react";

export const ProductContext = createContext();

 const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsChange, setProductsChange]=useState(false)
  useEffect(() => {
    const fetchProducts = async () => {
     try {
      await fetch("/api/product/getAll")
      .then(response=>response.json())
      .then(data=> {
        setProducts(data)
        setProductsChange(false)
      })
      // const res = await fetch("/api/product/getAll");
      // const data = await res.json();
      //  setProducts(data);
     } catch (error) {
      console.log(error)
     }
    };
    fetchProducts();
  }, [productsChange]);
  return (
    <ProductContext.Provider value={{products,productsChange,setProductsChange}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProducts=()=>{
  const products=useContext(ProductContext)
  return products;
}
