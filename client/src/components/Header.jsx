import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useThemeContext } from "../context/ThemeProvider";
import {UserProfile , Cart }from './index';
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
      {icon}
  
  </button>
);
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { activeMenu, setActiveMenu ,isClicked , setIsClicled , handleClick ,screenSize , setScreenSize} = useThemeContext();
  useEffect(() => {
    const handleResize =()=> setScreenSize(window.innerWidth)
  window.addEventListener('resize',handleResize)

  handleResize();
    return () => window.removeEventListener('resize',handleResize)
  }, [])

  useEffect(() => {
    if(screenSize<=900){
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }


  }, [screenSize])
  
  
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color="blue"
        icon={<IoMenuOutline />}
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color="blue"
          icon={<FiShoppingBag />}
        />
        <>
          {currentUser ? (
            <div>
              {/* <Link to="/profile"> */}
                <div 
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                onClick={() => handleClick('userProfile')}
                >
                  <img
                    className="rounded-full w-8 h-8"
                    src={currentUser.avatar}
                    alt="user-profile"
                  />
                  <p>
                    <span className="text-gray-400 text-14">Hi,</span>{" "}
                    <span className="text-gray-400 font-bold ml-1 text-14">
                      {currentUser.firstname}
                    </span>
                  </p>
                  <MdOutlineKeyboardArrowDown className="text-gray-400 text-14" />
                </div>
              {/* </Link> */}
            </div>
          ) : (
            <Link to={"sign-in"}>
              <PiSignInBold />{" "}
            </Link>
          )}
        </>
      </div>
      {isClicked.userProfile && <UserProfile/>}
      {isClicked.cart && <Cart/>}
    </div>
    // <header className="bg-slate-200 shadow-md">
    //   <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
    //     <button type="button"  onClick={()=>setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}>admin navbar</button>
    //     <Link to="/">
    //       <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
    //         <span className="text-slate-500">Login</span>
    //         <span className="text-slate-700">Project</span>
    //       </h1>
    //     </Link>
    //     <form className="bg-slate-100 rounded-lg flex items-center p-3">
    //       <input
    //         className="bg-transparent focus:outline-none w-24 sm:w-64"
    //         type="text"
    //         name=""
    //         id=""
    //         placeholder="Search..."
    //       />
    //       <FaSearch className="text-slate-600" />
    //     </form>
    //     <ul className="flex gap-4">
    //       <li className="hidden sm:inline text-slate-700 hover:underline">
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li className="hidden sm:inline text-slate-700 hover:underline">
    //         <Link to="/about">About</Link>
    //       </li>
    //       <li className=" text-slate-700 hover:underline">

    //           {currentUser ? (
    //             <Link to="/profile">
    //             <img
    //               src={currentUser.avatar}
    //               alt="profile"
    //               className="rounded-full w-7 h-7 object-cover"
    //             />
    //         </Link>

    //           ) : (<Link to={'sign-in'}>
    //             Sign In </Link>
    //           )}
    //       </li>
    //     </ul>
    //   </div>
    // </header>
  );
}
