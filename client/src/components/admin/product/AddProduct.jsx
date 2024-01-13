import { useState, useEffect } from "react";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../../redux/product/productsSlice";
import {
  uploadImages,
  removeImage,
} from "../../../redux/upload/uploadFileSlice";
export default function AddProduct() {
  const dispatch = useDispatch();
  const {filesCount } = useSelector((state) => state.images);
  const { imageUrls } = useSelector((state) => state.products.productTemp);
  const {  productTemp } = useSelector(
    (state) => state.products
  );
  const [files, setFiles] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [initialFormData, setInitialFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    category: "گل سر",
    regularPrice: 0,
    discount: 0,
    count: 0,
    isPublished: false,
  });
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productTemp?.imageUrls.length > 0) {
      setFormData({
        ...formData,
        imageUrls: [
          ...new Set([...formData.imageUrls, ...productTemp.imageUrls]),
        ],
      });
     
    }
  }, [productTemp?.imageUrls]);
  const changeHandler = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, isPublished: e.target.checked });
    } else
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  const imageUploadHandler = async (e) => {
    if (files.length > 0 && files.length < 6) {
      const imgData = new FormData();
      for (let i = 0; i < files?.length; i++) {
        imgData.append("files", files[i]);
      }
      dispatch(uploadImages(imgData));

    } else {
      setError("Just pick minimum One Image or maximum 6 Images");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addProduct(formData))
    .unwrap()
      .then((data) => {
        console.log("Product added:", data);
        setFormData(initialFormData); 
        setFiles([]); 
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setError(error);
      });
  };
  const deleteHandler = async (id) => {
    dispatch(removeImage(id));
    const updatedImageUrls = formData.imageUrls.filter(
      (imageUrl) => imageUrl !== id
    );
    setFormData({ ...formData, imageUrls: updatedImageUrls });
    
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Add Product</h1>
      {error && <p>{error}</p>}
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
            value={formData.name}
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
            value={formData.description}
          />
          <select
            name="category"
            id="category"
            value={formData.category}
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
                onChange={changeHandler}
                value={formData.regularPrice}
              />
            </div>
            <div className="flex items-center gap-2 ">
              <label htmlFor="discount"> Discount : </label>
              <input
                type="number"
                className="border-gray-300 p-3 rounded-lg"
                name="discount"
                id="discount"
                value={formData.discount}
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
                value={formData.count}
                onChange={changeHandler}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                id="isPublished"
                className="w-5"
                checked={formData.isPublished}
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
              onClick={imageUploadHandler}
              disabled={files.length === 0}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 disabled:pointer-events-none"
            >
              upload
            </button>
          </div>

          <div className="flex flex-wrap justify-evenly gap-2">
          {imageUrls &&
            imageUrls.length > 0 &&
            imageUrls.map((image) => (
              <div key={image._id} className="relative border  border-green-700 rounded-lg">
                <img
                  className="h-20 w-20 object-contain rounded-lg"
                  src={`/images/${image.name}`}
                  srcSet={`/images/${image.name}`}
                  alt={image.name}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-3 text-slate-700 hover:text-red-700 rounded-lg uppercase hover:opacity-75"
                  onClick={() => deleteHandler(image._id)}
                  disabled={isDeleting}
                >
                  <IoTrashBin /> 
                </button>
              </div>
            ))}
          </div>
              <button
            type="submit"
            disabled={
              // filesCount === 0 ||
              imageUrls.length===0||
              formData.imageUrls.length > 6 ||
              formData.name.trim() === "" ||
              formData.description.trim() === ""
            }
            className="text-white uppercase bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            Create Product
          </button>
        </div>
      </form>
    </main>
  );
}
