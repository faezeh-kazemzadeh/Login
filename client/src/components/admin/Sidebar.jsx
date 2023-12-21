import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
// import { links } from "../../data/data.js";
import { links } from "../../data/data.jsx";
import { useThemeContext } from "../../context/ThemeProvider.jsx";
export default function Sidebar() {
  const {activeMenu , setActiveMenu,screenSize} = useThemeContext();
  const handleCloseSideBar=()=>{
    if(activeMenu && screenSize<=900){
      setActiveMenu(false)
    }
  }
  const activeLink='flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700  text-md m-2'
  const normalLink='flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to=""
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900"
            >
              <SiShopware />
              <span>shoppy</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(prevActiveMenu=>!prevActiveMenu)}
              className="text-xl rounded-full p-3 hover:bg-light-gray text-slate-900 mt-4 block "
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div>
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.url}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({isActive})=>isActive? activeLink: normalLink}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
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
