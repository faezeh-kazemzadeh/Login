import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
export default function SignIn() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {error,isLoading}=useSelector((state)=>state.user)
  const [formData, setFormData] = useState({});
 
  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
     dispatch(signInSuccess(data))
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message))
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl my-7  text-center font-semibold">Sign In</h1>
      <form className="flex flex-col gap-4 " onSubmit={submitHandler}>
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Username..."
          onChange={changeHandler}
          name="email"
          id="email"
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Password..."
          onChange={changeHandler}
          name="password"
          id="password"
        />
        <button
          disabled={isLoading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Do not have an Account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
