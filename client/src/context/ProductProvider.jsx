import React, { createContext, useContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsChange, setProductsChange] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (productsChange) {
      fetchProducts();
      setProductsChange(false);
    }
  }, [productsChange]);

  const updateProducts = () => {
    setProductsChange(true);
  };
  const fetchProducts = async () => {
    await fetch("/api/product/getAll")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProducts = () => {
  const products = useContext(ProductContext);
  return products;
};
