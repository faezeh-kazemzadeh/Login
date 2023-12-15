import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UnAuthorized from "./UnAuthorized";
// Outlet is the component to show children
export default function PrivateRoute({ allowedRoles }) {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && allowedRoles.includes(currentUser.roles) ? (
    <Outlet />
  ) : currentUser && !allowedRoles.includes(currentUser.roles) ? (
    <UnAuthorized />
  ) : (
    <Navigate to="/sign-in" />
  );
}
