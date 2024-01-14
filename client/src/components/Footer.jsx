import React from "react";
import { FiAtSign } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { IoIosPhonePortrait } from "react-icons/io";
export default function Footer() {
  return (
    <div className="grid bg-slate-700 text-slate-300">
      <h1>Footer</h1>
      <nav>
        <ul className="flex gap-4 flex-wrap justify-center ">
          <li className="w-10 h-10 bg-slate-500 hover:bg-red-600 transition-colors duration-300 rounded-full">
            <a className="m-auto w-full items-center h-full flex justify-center" href="mailto:info@google.com" title="ایمیل" target="_blank">
              <FiAtSign />
            </a>
          </li>
          <li className="w-10 h-10 bg-slate-500 hover:bg-red-600 transition-colors duration-300 rounded-full">
            <a className="m-auto w-full items-center h-full flex justify-center"
              href="https://maps.app.goo.gl/ko5zr5oe8L65ZpvK9"
              title="Dom"
              target="_blank"
            >
              <SlLocationPin />
            </a>
          </li>
          <li className="w-10 h-10 bg-slate-500 hover:bg-red-600 transition-colors duration-300 rounded-full">
            <a className="m-auto w-full items-center h-full flex justify-center" href="tel:0210123457" title="call">
              <BsTelephone />
            </a>
          </li>
          <li className="w-10 h-10 bg-slate-500 hover:bg-red-600 transition-colors duration-300 rounded-full">
            <a className="m-auto w-full items-center h-full flex justify-center" href="tel:0912123456789" title="phone">
              <IoIosPhonePortrait />
            </a>
          </li>
        </ul>
      </nav>
      <div className="grid justify-center">
        <form className="w-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 w-3/4 mx-auto ">
            <div className="p-4">
              <textarea
                className="w-full bg-slate-900 text-slate-400 focus-visible:border-slate-900 border-slate-900"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="grid grid-rows-4 gap-4 p-4">
              <input type="text" name="" id="" className="bg-slate-900 text-slate-400 focus-visible:border-slate-900 border-slate-900"/>
              <input type="text" name="" id="" className="bg-slate-900 text-slate-400 focus-visible:border-slate-900 border-slate-900"/>
              <input type="text" name="" id="" className="bg-slate-900 text-slate-400 focus-visible:border-slate-900 border-slate-900"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
