import React, { useEffect, useState } from "react";
import { getCategories } from "../../../utils/helper";
import styles from "./contentAdd.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uploadImages } from "../../../redux/upload/uploadFileSlice";
export default function ContentAdd() {
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [hasContent, setHasContent] = useState(false);
  const [initialFormData, setInitialFormData] = useState({
    title: "",
    body: "",
    category: "",
    author: currentUser._id,
    imageUrls: [],
    isPublished: false,
  });
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const imagesArray = [...selectedImages];
    const filesArray = [...images];
    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < files.length; i++) {
      try {
        const result = await readFile(files[i]);
        if (!imagesArray.includes(result)) {
          imagesArray.push(result);
        }
        if (!filesArray.some((file) => file.name === files[i].name)) {
          filesArray.push(files[i]);
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }

    setSelectedImages(imagesArray);
    setImages(filesArray);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedFiles = [...images];
    updatedImages.splice(index, 1);
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedImages);
    setImages(updatedFiles);
  };
  const changeHandler = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, isPublished: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgData = new FormData();
    for (let i = 0; i < images?.length; i++) {
      imgData.append("files", images[i]);
    }
    try {
      if (!hasContent) {
        await dispatch(uploadImages(imgData))
          .unwrap()
          .then((data) => {
            if (data.success === true) {
              const imgIds = data.imageUrls.map((image) => image._id);
              setFormData((prevFormData) => ({
                ...prevFormData,
                imageUrls: [...imgIds],
              }));
              setHasContent(true);
              setImages([])
            } else {
              setError(data.message);
            }
          })
          .catch((err) => console.log(err));
      }else{
        sendDataToApi();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (hasContent && formData.imageUrls.length > 0) {
      sendDataToApi();
    }
  }, [hasContent]);

  const sendDataToApi = async () => {
    console.log(formData);
    try {
      await fetch("/api/content/add", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.success === true) {
            setFormData(initialFormData);
            setHasContent(false);
            setSelectedImages([]);
          } else {
            setError(data.message);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  };
  console.log(formData);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Add Content</h1>
      {error && <p>{error}</p>}
      <form className="flex flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            className="border p-3 rounded-lg"
            value={formData.title}
            onChange={changeHandler}
          />
          <textarea
            type="text"
            name="body"
            id="body"
            cols="30"
            rows="10"
            value={formData.body}
            className=" border p-3 rounded-lg"
            onChange={changeHandler}
          ></textarea>
          <select
            name="category"
            onChange={changeHandler}
            value={formData.category}
            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="default">Select a Category...</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
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
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The First image will be the cover (max 6)
            </span>
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="p-3 border-gray-300 rounded w-full"
            />
            <div className={`rounded-lg border bg-white ${styles.imagesBox}`}>
              {selectedImages.map((image, index) => (
                <div key={index} className={styles.imageDiv}>
                  <img src={image} alt={`Selected Image ${index}`} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="p-3 bg-slate-700 text-white border border-slate-700 rounded uppercase hover:shadow-lg disabled:opacity-80 disabled:pointer-events-none"
            >
              save
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
