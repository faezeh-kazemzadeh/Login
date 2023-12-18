import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
// import { links } from "../../data/data.js";
import { links } from "../../data/data.jsx";

export default function Sidebar() {
  const activeMenu = true;
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to=""
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900"
            >
              <SiShopware />
              <span>shoppy</span>
            </Link>
            <button
              type="button"
              onClick={() => {}}
              className="text-xl rounded-full p-3 hover:bg-light-gray text-slate-900 mt-4 block "
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div>
            {links.map((item) => (
              <div key={item.title}>
                <p>{item.title}</p>
                {item.links.map(link=>(
                    <NavLink to={`${link.url}`} key={link.name} onClick={()=>{}}>
                        {link.icon}
                        <span>{link.name}</span>
                    </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
