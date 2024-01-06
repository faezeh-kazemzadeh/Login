import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../../context/ProductProvider";

export default function UpdateProduct() {
  const params = useParams();
  const { setProductsChange } = useProducts();
  const [updated, setUpdated] = useState(false);
  const { products } = useProducts();
  const [product, setProduct] = useState(undefined);
  const [files, setFiles] = useState();
  useEffect(() => {
    const foundProduct = products.find((product) => product._id === params.id);
    if (foundProduct) {
      const images = foundProduct.imageUrls.map((image) => image._id);
      const updatedProduct = { ...foundProduct, imageUrls: images };
      setProduct(updatedProduct);
    }
  }, [products]);

  const changeHandler = (e) => {
    if (e.target.type === "checkbox") {
      setProduct({ ...product, isPublished: e.target.checked });
    } else setProduct({ ...product, [e.target.name]: e.target.value });
    setUpdated(true);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitHandler");

    await fetch("/api/product/update", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductsChange(true);
        setUpdated(false);
      });
    console.log(product);
  };
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">UpdateProduct</h1>

      {product && (
        <form
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              name="name"
              id="name"
              onChange={changeHandler}
              required
              minLength="5"
              maxLength="250"
              placeholder="Name"
              className=" border p-3 rounded-lg"
              value={product.name}
            />
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={changeHandler}
              required
              minLength="5"
              maxLength="250"
              placeholder="Description"
              className=" border p-3 rounded-lg"
              value={product.description}
            />
            <select
              name="category"
              id="category"
              value={product.category}
              onChange={changeHandler}
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="گل سر">گل سر</option>
              <option value="پیکسل">پیکسل</option>
            </select>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 ">
                <label htmlFor="regularPrice"> Regular Price : </label>
                <input
                  type="number"
                  className="border-gray-300 p-3 rounded-lg"
                  name="regularPrice"
                  id="regularPrice"
                  value={product.regularPrice}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex items-center gap-2 ">
                <label htmlFor="discount"> Discount : </label>
                <input
                  type="number"
                  className="border-gray-300 p-3 rounded-lg"
                  name="discount"
                  id="discount"
                  value={product.discount}
                  min={0}
                  max={30}
                  onChange={changeHandler}
                />
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="count">Count : </label>
                <input
                  type="number"
                  className="border-gray-300 p-3 rounded-lg"
                  name="count"
                  id="count"
                  value={product.count}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  className="w-5"
                  checked={product.isPublished}
                  onChange={changeHandler}
                />
                <span>Publish</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The First image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                name="images"
                id="images"
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                multiple
                className="p-3 border-gray-300 rounded w-full"
              />
              <button
                type="button"
                // onClick={imageUploadHandler}
                // disabled={files.length === 0 || formData.imageUrls.length > 5}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 disabled:pointer-events-none"
              >
                upload
              </button>
            </div>
            <button
              type="submit"
              disabled={!updated}
              className="text-white uppercase bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
            >
              update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
