import {GoogleAuthProvider , getAuth,signInWithPopup} from '@firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch=useDispatch()
    const navigate = useNavigate()
  const googleClickHandler = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const auth= getAuth(app)

        const result=await signInWithPopup(auth,provider)
        const res=await fetch('/api/auth/google',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email:result.user.email,
                photo:result.user.photoURL,
                phone:result.user.phoneNumber,
                avatar:result.user.photoURL
            })
        })
        const data= await res.json()
        dispatch(signInSuccess(data))
        navigate('/')

    } catch (error) {
        console.log(error)
    }
  };
  return (
    <button
      type="button"
      onClick={googleClickHandler}
      className="bg-red-700 text-white uppercase rounded-lg p-3 hover:opacity-95  "
    >
      cntinue with google
    </button>
  );
}
