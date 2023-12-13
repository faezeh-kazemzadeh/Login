import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);


  useEffect(() => {
    if (file) {
      fileUploadHandler(file);
    }
  }, [file]);

  const fileUploadHandler = (file) => {
    setFileUploadError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        setFileUploadError(false);

        });
      }
    );
  };
  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-slate-700 font-semibold text-3xl text-center my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full cursor-pointer self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
        {fileUploadError ? (
          <span className="text-red-700">
            Error Image upload (image must be less than 2 mb)
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-500">{`Upload is ${filePerc}% Done.`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-700">Image successfully uploaded!</span>
        ) : (
          ""
        )}
        </p>
        <input
          type="text"
          className="p-3 rounded-lg"
          value={currentUser.firstname && currentUser.firstname }
          placeholder="firstname"
          onChange={changeHandler}
        />
        <input
          type="text"
          className="p-3 rounded-lg"
          value={currentUser.lastname && currentUser.lastname}
          placeholder="Last Name"
          onChange={changeHandler}
        />
        <input
          type="text"
          className="p-3 rounded-lg"
          value={currentUser.phone && currentUser.phone }
          placeholder="Phone"
          onChange={changeHandler}
        />
        <input
          type="email"
          className="p-3 rounded-lg"
          value={currentUser.email}
          placeholder="E-mail"
          onChange={changeHandler}
        />
        <input
          type="passwod"
          className="p-3 rounded-lg"
          placeholder="Password"
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase disabled:opacity-80"
        >
          update
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
