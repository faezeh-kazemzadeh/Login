import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import {Sidebar} from './index';
export default function Dashboard() {
  const activeMenu = true;

  return (
    <div>
      <div className="flex relative dark:bg-main-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
            style={{ background: "blue", borderRadius: "50%" }}
          >
            <FiSettings />
          </button>
        </div>
        {activeMenu ? (
          <div className="w-64 fixed sidebar dark:bg-secondary-bg bg-white">
            <Sidebar/>
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg"><Sidebar/></div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-bg  w-full min-h-screen flex-2 "
          }
        >
             <div className="">
        <Outlet />
      </div>
        </div>
       
      </div>
      {/* <aside><h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to={"product/add"}>add product</Link>
        </li>
        <li>
          <Link to={"product/delete"}>remove product</Link>
        </li>
        <li>
          <Link to={"product/getAll"}>Get All products</Link>
        </li>
      </ul>
      
      
      </aside> */}
    
    </div>
  );
}
