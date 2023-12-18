import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {Link, useNavigate} from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, error, isLoading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate()
  const fileRef = useRef(null);

  const dispatch = useDispatch();

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const deleteUserHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
      navigate('/sign-up')
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const signOutHandler =async(e)=>{
    e.preventDefault();
    dispatch(signOutUserStart())
    try {
      const res = await fetch('/api/auth/signout')
      const data =res.json()
      if(data.success === false){
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess())
      navigate('/sign-in')
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-slate-700 font-semibold text-3xl text-center my-7">
        Profile
      </h1>
      <Link to='/admin/dashboard'> <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               dashboard</Link>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
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
          defaultValue={currentUser.firstname && currentUser.firstname}
          placeholder="firstname"
          onChange={changeHandler}
          name="firstname"
        />
        <input
          type="text"
          className="p-3 rounded-lg"
          defaultValue={currentUser.lastname && currentUser.lastname}
          placeholder="Last Name"
          onChange={changeHandler}
          name="lastname"
        />
        <input
          type="text"
          className="p-3 rounded-lg"
          defaultValue={currentUser.phone && currentUser.phone}
          placeholder="Phone"
          onChange={changeHandler}
          name="phone"
        />
        <input
          type="email"
          className="p-3 rounded-lg"
          defaultValue={currentUser.email}
          placeholder="E-mail"
          onChange={changeHandler}
          name="email"
        />
        <input
          type="passwod"
          className="p-3 rounded-lg"
          placeholder="Password"
          onChange={changeHandler}
          name="password"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase disabled:opacity-80"
        >
          {isLoading ? "updating..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span
          className="text-red-700 cursor-pointer"
          onClick={deleteUserHandler}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={signOutHandler}>Sign Out</span>
      </div>
      {error ? (
        <p className="text-red-700 self-center">{error}</p>
      ) : updateSuccess ? (
        <p className="text-green-700 self-center">
          Profile updated successfully
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
