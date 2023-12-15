import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import AuthenticationPrivateRoute from "./components/AuthenticationPrivateRoute";
import AdminDashboard from "./components/AdminDashboard";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

const ROLES = {
  Admin: "Admin",
  Editor: "Editor",
  User: "User",
};
export default function App() {
  const {currentUser} = useSelector(state=>state.user)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              element={
                <PrivateRoute allowedRoles={[ROLES.User, ROLES.Admin]} />
              }
            >
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* <Route element={<AuthenticationPrivateRoute />}> */}
            <Route path="sign-in" element={ currentUser ? <Navigate to='/' replace={true}/>: <SignIn />} />
            <Route path="sign-up" element={currentUser ? <Navigate to='/'  replace={true}/>: <SignUp />} />
            {/* </Route> */}
            <Route path="about" element={<About />} />
            <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
