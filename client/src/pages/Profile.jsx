import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const changeHandler=()=>{

  }
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-slate-700 font-semibold text-3xl text-center my-7">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full cursor-pointer self-center"
        />
        <input
          type="text"
          className="p-3 rounded-lg"
          value={currentUser.firstname ? currentUser.firstname :''}
          placeholder="firstname"
          onChange={changeHandler}
        />
        <input
          type="text"
          className="p-3 rounded-lg"
          value={currentUser.lastname ? currentUser.lastname :''}
          placeholder="Last Name"
          onChange={changeHandler}
        />
        <input
          type="text"
          className="p-3 rounded-lg"
          value={currentUser.phone ? currentUser.phone : ''}
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
