import { useSelector } from "react-redux";
import { Navigate, Outlet ,useLocation} from "react-router-dom";
// Outlet is the component to show children
export default function PrivateRoute({ allowedRoles }) {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  return (currentUser?.roles?.filter(role => allowedRoles?.includes(role)).length >= 1 ? 
    <Outlet />
  :  currentUser?.roles?.filter(role => allowedRoles?.includes(role)).length === 0 ? 
    <Navigate to="/unauthorized" state={{ from: location }} replace={true}/>
  : 
    <Navigate to="/sign-in" state={{ from: location }} replace={true}/>
  );
}
