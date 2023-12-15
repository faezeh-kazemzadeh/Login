import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Login</span>
            <span className="text-slate-700">Project</span>
          </h1>
        </Link>
        <form className="bg-slate-100 rounded-lg flex items-center p-3">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            name=""
            id=""
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className=" text-slate-700 hover:underline">
            
              {currentUser ? (
                <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="rounded-full w-7 h-7 object-cover"
                />
            </Link>

              ) : (<Link to={'sign-in'}>
                Sign In </Link>
              )}
          </li>
        </ul>
      </div>
    </header>
  );
}
