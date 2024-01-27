import React, { useEffect, useState } from "react";
import { getCategories } from "../../../utils/helper";
import styles from './contentAdd.module.css';
export default function ContentAdd() {
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([])
  const [images, setImages] = useState([])
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);
 
  const handleFileChange = async (event) => {
    const files = event.target.files;
    const imagesArray = [...selectedImages];
    const filesArray= [...images]
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
        if(!imagesArray.includes(result)){
          imagesArray.push(result);
        }
       if(!filesArray.some(file=>file.name===files[i].name)) {
          filesArray.push(files[i])
          }
      
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
 
    setSelectedImages(imagesArray);
    setImages(filesArray)
  };
  const handleRemoveImage =(index)=>{
    const updatedImages = [...selectedImages];
    const updatedFiles= [...images]
    updatedImages.splice(index,1)
    updatedFiles.splice(index,1)
    setSelectedImages(updatedImages)
    setImages(updatedFiles)
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Add Content</h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            name="body"
            id="body"
            cols="30"
            rows="10"
            className=" border p-3 rounded-lg"
          ></textarea>
          <select
            name="category"
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
          <div className="flex gap-4">

        <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="p-3 border-gray-300 rounded w-full"
            />
            <button
              type="button"
              className="p-3 text-slate-700 border border-slate-700 rounded uppercase hover:shadow-lg disabled:opacity-80 disabled:pointer-events-none"
            >
             save
            </button>
            </div>
            <div className={styles.imagesBox}>
              {selectedImages.map((image,index)=>(
                <div key={index} className={styles.imageDiv}>
                <img src={image} alt={`Selected Image ${index}`} />
                <button type="button" onClick={()=>handleRemoveImage(index)}>x</button>
                </div>
              ))}
            </div>
        </div>
      </form>
    </main>
  );
}
