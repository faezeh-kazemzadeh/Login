import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  const [formData, setFormData] = useState({});
  const navigate=useNavigate()
  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler =async (e) => {
    e.preventDefault();
try {

  setIsLoading(true)
  const res= await fetch('/api/auth/signup',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(formData)
  })
const data=await res.json()
if(data.success===false){
  setError(data.message)
  setIsLoading(false)
  return
}
setIsLoading(false)
setError(null)
navigate('/sign-in')
} catch (err) {
  setIsLoading(false)
  setError(err.message)
}
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="First Name..."
          name="firstname"
          id="firstname"
          onChange={changeHandler}
        />
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Last Name..."
          name="lastname"
          id="lastname"
          onChange={changeHandler}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email..."
          name="email"
          id="email"
          onChange={changeHandler}
        />
        <input
          type="number"
          className="border p-3 rounded-lg"
          placeholder="Phone"
          name="phone"
          id="phone"
          onChange={changeHandler}
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          name="password"
          id="password"
          onChange={changeHandler}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? 'Loading...' :'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
